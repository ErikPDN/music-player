import { NativeModule, requireNativeModule } from 'expo'

import { TorrentEngineModuleEvents } from './TorrentEngine.types'

declare class TorrentEngineModule extends NativeModule<TorrentEngineModuleEvents> {
	addMagnet(magnetUri: string): Promise<void>
	pause(downloadId: string): Promise<void>
	resume(downloadId: string): Promise<void>
	remove(downloadId: string, deleteFiles: boolean): Promise<void>
}

export default requireNativeModule<TorrentEngineModule>('TorrentEngine')
