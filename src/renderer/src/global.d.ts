import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
    interface Window {
        electron: ElectronAPI;
        api: {
            runCode: (type: string, code: string) => void;
            saveFile: (type: string, code: string) => void;
            overwriteFile: (filePath: string, code: string) => void;
            saveFileBeforeClosing: (filePath: string, code: string) => void;
            showConfirmDialog: () => void;
        };
    }
}
