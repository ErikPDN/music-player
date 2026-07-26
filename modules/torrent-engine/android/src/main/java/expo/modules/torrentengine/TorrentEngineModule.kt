package expo.modules.torrentengine

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import org.libtorrent4j.AlertListener

class TorrentEngineModule : Module() {
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
              sendEvent("onError", mapOf("downloadId" to downloadID, "message" to a.error().message()))
            }
            else -> {}
          }
        }
      })
    }
    
    AsyncFunction("addMagnet") { downloadId: String, magnetUri: String, savePath: String ->
      TorrentSession.addMagnet(downloadId, magnetUri, savePath)
    }

    AsyncFunction("pause") { downloadId: String ->
      TorrentSession.pause(downloadId)
    }

    AsyncFunction("resume") { downloadId: String ->
      TorrentSession.resume(downloadId)
    }

    AsyncFunction("remove") { downloadId: String, deleteFiles: Boolean ->
      // TODO: remover o torrent da sessão (e opcionalmente os arquivos)
    }
  }
}
