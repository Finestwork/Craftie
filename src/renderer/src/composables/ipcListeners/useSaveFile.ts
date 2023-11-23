import { useFileStore } from '@renderer/stores/FileStore';
import { onUnmounted } from 'vue';

export const useSaveFileOnKeypress = () => {
    const deactivateSaveFileListener = window.electron.ipcRenderer.on('onShortcutSaveFile', () => {
        const FileStore = useFileStore();
        const File = FileStore.getCurrentFile;

        // Only save file if contents are not empty
        if (File.content.trim() === '') {
            return;
        }

        // Check if file is already saved, overwrite its content instead
        // And do not create a new one
        if (File.filePath.trim() !== '') {
            // Only overwrite the content if the content has been changed
            if (File.content !== File.previousContent) {
                window.api.overwriteFile(File.filePath, File.content);
            }
            return;
        }

        window.api.saveFile(File.type, File.content);
    });

    // Updates previous content of the current active file
    const deactivateFileChangeListener = window.electron.ipcRenderer.on(
        'updateFilePreviousContent',
        (_, code) => {
            const FileStore = useFileStore();
            FileStore.updateFilePreviousContent(code); // To keep track of the changes
        }
    );

    onUnmounted(() => {
        deactivateSaveFileListener();
        deactivateFileChangeListener();
    });
};
export const useFileSuccessfullyStored = () => {
    const deactivate = window.electron.ipcRenderer.on(
        'fileSavedSuccessfully',
        (_, filePath: string, baseName: string, code: string) => {
            const FileStore = useFileStore();
            FileStore.updateFilePreviousContent(code);
            FileStore.setActiveFileNameAndPath(baseName, filePath);
        }
    );

    onUnmounted(() => {
        deactivate();
    });
};

export const useSaveFileBeforeClosing = () => {
    const FileStore = useFileStore();
    const deactivateSaveFile = window.electron.ipcRenderer.on('saveFileBeforeClose', () => {
        const File = FileStore.getCurrentFile;
        window.api.saveFileBeforeClosing(File.filePath, File.content);
    });
    const deactivateCloseFile = window.electron.ipcRenderer.on('closeFile', () => {
        FileStore.deleteCurrentActiveFile();
    });

    onUnmounted(() => {
        deactivateSaveFile();
        deactivateCloseFile();
    });
};
