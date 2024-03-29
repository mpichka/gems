import { electronAPI, type ElectronAPI } from "@electron-toolkit/preload"
import * as api from "@server/routes"
import { contextBridge } from "electron"

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI)
    contextBridge.exposeInMainWorld("api", api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

export type ServerAPI = typeof api

declare global {
  interface Window {
    electron: ElectronAPI
    api: ServerAPI
  }
}
