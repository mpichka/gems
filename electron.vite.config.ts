import vue from "@vitejs/plugin-vue"
import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import { resolve } from "path"
import svgLoader from "vite-svg-loader"

export default defineConfig({
  main: {
    resolve: {
      alias: {
        "@server": resolve("src/main/src")
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    resolve: {
      alias: {
        "@server": resolve("src/main/src")
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
        "@icons": resolve("src/renderer/src/assets/icons"),
        "@components": resolve("src/renderer/src/components"),
        "@hooks": resolve("src/renderer/src/hooks")
      }
    },
    plugins: [vue(), svgLoader()]
  }
})
