// electron.vite.config.ts
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import vue from "@vitejs/plugin-vue";
var __electron_vite_injected_dirname = "C:\\Users\\Youne\\OneDrive\\Desktop\\personal-projects\\Main Projects\\Craftie\\app";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve(__electron_vite_injected_dirname, "src/renderer/src"),
        "@components": resolve(__electron_vite_injected_dirname, "src/renderer/src/components"),
        "@composables": resolve(__electron_vite_injected_dirname, "src/renderer/src/composables")
      }
    },
    plugins: [vue()]
  }
});
export {
  electron_vite_config_default as default
};
