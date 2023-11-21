import { useFileStore } from '@renderer/stores/FileStore';
import { onUnmounted } from 'vue';

export const useSaveFileOnKeypress = () => {
    const deactivate = window.electron.ipcRenderer.on('onShortcutSaveFile', () => {
        const FileStore = useFileStore();
        const File = FileStore.getCurrentFile;
        // Only save file if contents are not empty
        if (File.content.trim() === '') {
            return;
        }

        // Check if file is already saved, instead overwrite its content
        if (File.filePath.trim() !== '') {
            window.api.overwriteFile(File.filePath, File.content);
            return;
        }

        window.api.saveFile(File.type, File.content);
    });

    onUnmounted(() => {
        deactivate();
    });
};

export const useFileSuccessfullyStored = () => {
    const deactivate = window.electron.ipcRenderer.on(
        'fileSavedSuccessfully',
        (_, filePath: string, baseName: string) => {
            const FileStore = useFileStore();
            FileStore.setActiveFileNameAndPath(baseName, filePath);
        }
    );

    onUnmounted(() => {
        deactivate();
    });
};
