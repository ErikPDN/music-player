package expo.modules.torrentengine

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class TorrentEngineModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("TorrentEngine")

    Events("onMetadata", "onProgress", "onFileComplete", "onError")

    AsyncFunction("addMagnet") { magnetUri: String ->
      // TODO: iniciar sessão libtorrent4j e adicionar o magnet
    }

    AsyncFunction("pause") { downloadId: String ->
      // TODO: pausar o torrent correspondente
    }

    AsyncFunction("resume") { downloadId: String ->
      // TODO: retomar o torrent correspondente
    }

    AsyncFunction("remove") { downloadId: String, deleteFiles: Boolean ->
      // TODO: remover o torrent da sessão (e opcionalmente os arquivos)
    }
  }
}
