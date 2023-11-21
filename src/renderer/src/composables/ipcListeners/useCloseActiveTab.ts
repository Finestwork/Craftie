import { useFileStore } from '@renderer/stores/FileStore';
import { onUnmounted } from 'vue';

export const useCloseActiveTab = () => {
    const FileStore = useFileStore();
    const deactivate = window.electron.ipcRenderer.on('closeActiveTab', () => {
        if (FileStore.areFilesEmpty) return;
        FileStore.deleteCurrentActiveFile();
    });

    onUnmounted(() => {
        deactivate();
    });
};
