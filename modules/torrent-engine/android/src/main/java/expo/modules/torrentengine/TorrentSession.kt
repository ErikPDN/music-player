package expo.modules.torrentengine

import org.libtorrent4j.SessionManager
import org.libtorrent4j.AlertListener
import org.libtorrent4j.TorrentHandle
import org.libtorrent4j.TorrentInfo
import org.libtorrent4j.alerts.*
import java.io.File
import java.util.concurrent.ConcurrentHashMap
import org.libtorrent4j.swig.session_handle

object TorrentSession {
    val session = SessionManager()

    private val handleByDownloadId = ConcurrentHashMap<String, TorrentHandle>()
    private val downloadByIdInfoHash = ConcurrentHashMap<String, String>();
    private val completedFilesByDownloadId = ConcurrentHashMap<String, Int>()

    fun ensureStarted() {
        if (!session.isRunning) session.start()
    }

    fun addMagnet(downloadId: String, magnetUri: String, savePath: String): TorrentInfo {
        val saveDir = File(savePath)     
        val data = session.fetchMagnet(magnetUri, 30, saveDir) // timeout in seconds
        val torrentInfo = TorrentInfo.bdecode(data)

        session.download(torrentInfo, saveDir)

        val handle = session.find(torrentInfo.infoHash())
        handleByDownloadId[downloadId] = handle
        downloadByIdInfoHash[torrentInfo.infoHash().toString()] = downloadId

        return torrentInfo
    }
    
    fun pause(downloadId: String) = handleByDownloadId[downloadId]?.pause()
    fun resume(downloadId: String) = handleByDownloadId[downloadId]?.resume()
    
    fun remove(downloadId: String, deleteFiles: Boolean) {
        val handle = handleByDownloadId[downloadId] ?: return
        if (deleteFiles) {
            session.remove(handle, session_handle.delete_files)
        } else {
            session.remove(handle)
        }
        handleByDownloadId.remove(downloadId)
        downloadByIdInfoHash.entries.removeIf { it.value == downloadId }
        completedFilesByDownloadId.remove(downloadId)
    }
    
    fun addListener(listener: AlertListener) = session.addListener(listener)
    
    fun downloadIdForInfoHash(infoHash: String): String? = downloadByIdInfoHash[infoHash]
    
    fun incrementCompletedFiles(downloadId: String) {
        completedFilesByDownloadId.merge(downloadId, 1) { old, inc -> old + inc }
    }
    
    fun completedFilesForDownloadId(downloadId: String): Int = completedFilesByDownloadId[downloadId] ?: 0
}