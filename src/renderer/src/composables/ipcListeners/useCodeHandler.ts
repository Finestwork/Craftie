import { useFileStore } from '@renderer/stores/FileStore';
import { onUnmounted, ref } from 'vue';

export const runCode = () => {
    const deactivate = window.electron.ipcRenderer.on('onShortcutKeyRunCode', () => {
        const FileStore = useFileStore();
        const File = FileStore.getCurrentFile;
        window.api.runCode(File.type, File.content);
    });

    onUnmounted(() => {
        deactivate();
    });
};

export const displayResult = () => {
    const result = ref();
    const deactivate = window.electron.ipcRenderer.on('displayCodeResult', (_, codeResult) => {
        result.value = codeResult.slice();
    });

    onUnmounted(() => {
        deactivate();
    });

    return {
        result
    };
};
