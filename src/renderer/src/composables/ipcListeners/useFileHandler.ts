import { useFileStore } from '@renderer/stores/FileStore';
import { onUnmounted } from 'vue';

export const useFileOpenedListener = () => {
    const deactivate = window.electron.ipcRenderer.on(
        'fileOpened',
        (_, filePath, fileName, ext, data) => {
            const OpenedFile = {
                filePath: filePath,
                fileName: fileName,
                type: ext,
                content: data
            };
            const FileStore = useFileStore();
            FileStore.addOpenedFile(OpenedFile);
        }
    );

    onUnmounted(() => {
        deactivate();
    });
};
