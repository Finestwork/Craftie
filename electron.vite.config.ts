import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    main: {
        resolve: {
            alias: {
                '@helpers': resolve(__dirname, './src/Helpers')
            }
        },
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@renderer': resolve(__dirname, './src/renderer/src'),
                '@components': resolve(__dirname, './src/renderer/src/components'),
                '@composables': resolve(__dirname, './src/renderer/src/composables'),
                '@helpers': resolve(__dirname, './src/Helpers')
            }
        },
        plugins: [vue()]
    }
});
