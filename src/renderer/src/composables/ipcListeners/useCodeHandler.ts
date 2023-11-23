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
    const result = ref('');
    const isError = ref(false);
    const deactivateCodeResult = window.electron.ipcRenderer.on(
        'displayCodeResult',
        (_, codeResult) => {
            isError.value = false;
            if (!codeResult) {
                result.value = '';
                return;
            }
            result.value = codeResult.slice();
        }
    );
    const deactivateCodeError = window.electron.ipcRenderer.on(
        'displayErrorResult',
        (_, codeResult) => {
            result.value = codeResult;
            isError.value = true;
        }
    );

    onUnmounted(() => {
        deactivateCodeResult();
        deactivateCodeError();
    });

    return {
        result,
        isError
    };
};
