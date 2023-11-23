import { useFileStore } from '@renderer/stores/FileStore';
import { onUnmounted } from 'vue';

export const useCloseActiveTab = () => {
    const FileStore = useFileStore();
    const deactivate = window.electron.ipcRenderer.on('closeActiveTab', () => {
        if (FileStore.areFilesEmpty) return;

        // Check if file is not saved
        const File = FileStore.getCurrentFile;
        const HasChanged = File.content !== File.previousContent;
        if (HasChanged) {
            window.api.showConfirmDialog();
            return;
        }
        FileStore.deleteCurrentActiveFile();
    });

    onUnmounted(() => {
        deactivate();
    });
};
