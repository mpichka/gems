import { ElectronAPI } from "@electron-toolkit/preload"
import { ServerAPI } from "./index"

declare global {
  interface Window {
    electron: ElectronAPI
    api: ServerAPI
  }
}
