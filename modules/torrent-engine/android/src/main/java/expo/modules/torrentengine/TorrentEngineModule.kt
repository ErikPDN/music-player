package expo.modules.torrentengine

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

import org.libtorrent4j.AlertListener
import org.libtorrent4j.alerts.Alert
import org.libtorrent4j.alerts.AlertType
import org.libtorrent4j.alerts.TorrentFinishedAlert
import org.libtorrent4j.alerts.TorrentErrorAlert
import org.libtorrent4j.alerts.StateUpdateAlert
import org.libtorrent4j.alerts.FileCompletedAlert
import android.os.Handler
import android.os.Looper

class TorrentEngineModule : Module() {
  private val handler = Handler(Looper.getMainLooper())
  private val progressTick = object : Runnable {
    override fun run() {
      TorrentSession.session.postTorrentUpdates()
      handler.postDelayed(this, 1000) // 1 second
    }
  }
  
  override fun definition() = ModuleDefinition {
    Name("TorrentEngine")

    Events("onMetadata", "onProgress", "onFileComplete", "onError")

    OnCreate {
      TorrentSession.ensureStarted()
      TorrentSession.addListener(object: AlertListener {
        override fun types(): IntArray? = null // todos os tipos, ou filtre com os códigos específicos
        
        override fun alert(alert: Alert<*>) {
          when (alert.type()) {
            AlertType.TORRENT_FINISHED -> {
              val a = alert as TorrentFinishedAlert
              val downloadID = TorrentSession.downloadIdForInfoHash(a.handle().infoHash().toString()) ?: return
              sendEvent("onFileComplete", mapOf("downloadId" to downloadID))
            }
            AlertType.TORRENT_ERROR -> {
              val a = alert as TorrentErrorAlert
              val downloadID = TorrentSession.downloadIdForInfoHash(a.handle().infoHash().toString()) ?: return
              sendEvent("onError", mapOf("downloadId" to downloadID, "message" to a.error().message))
            }
            AlertType.STATE_UPDATE -> {
              val a = alert as StateUpdateAlert
              a.status().forEach { status ->
                val infoHash = status.infoHashes.best.toString()
                val downloadID = TorrentSession.downloadIdForInfoHash(infoHash) ?: return@forEach
                sendEvent("onProgress", mapOf(
                  "downloadId" to downloadID,
                  "downloadedBytes" to status.totalWantedDone(),
                  "tracksCompleted" to TorrentSession.completedFilesForDownloadId(downloadID),
                ))
              }
            }
            AlertType.FILE_COMPLETED -> {
              val a = alert as FileCompletedAlert
              val downloadID = TorrentSession.downloadIdForInfoHash(a.handle().infoHash().toString()) ?: return
              TorrentSession.incrementCompletedFiles(downloadID)
            }
            else -> {}
          }
        }
      })
      
      handler.post(progressTick)
    }
    
    OnDestroy {
      handler.removeCallbacks(progressTick)
    }
    
    AsyncFunction("addMagnet") { downloadId: String, magnetUri: String, savePath: String ->
      val torrentInfo = TorrentSession.addMagnet(downloadId, magnetUri, savePath)
      sendEvent("onMetadata", mapOf(
        "downloadId" to downloadId,
        "title" to torrentInfo.name(),
        "totalBytes" to torrentInfo.totalSize(),
        "trackCount" to torrentInfo.numFiles()
      ))
    }

    AsyncFunction("pause") { downloadId: String ->
      TorrentSession.pause(downloadId)
    }

    AsyncFunction("resume") { downloadId: String ->
      TorrentSession.resume(downloadId)
    }

    AsyncFunction("remove") { downloadId: String, deleteFiles: Boolean ->
      TorrentSession.remove(downloadId, deleteFiles)
    }
  }
}
