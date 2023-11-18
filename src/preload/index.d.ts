import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      closeApp: () => void;
      maximizeApp: () => void;
    };
  }
}
