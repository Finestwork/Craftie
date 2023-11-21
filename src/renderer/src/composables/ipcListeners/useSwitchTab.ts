import { onUnmounted } from 'vue';
import { useFileStore } from '@renderer/stores/FileStore';

export const navigateOnKeyLeft = () => {
    const FileStore = useFileStore();
    const deactivate = window.electron.ipcRenderer.on('onShortcutSwitchTabLeft', () => {
        const ActiveElement = <HTMLElement>document.activeElement;
        ActiveElement?.blur?.();
        FileStore.switchActiveFileInd('dec');
    });

    onUnmounted(() => {
        deactivate();
    });
};

export const navigateOnKeyRight = () => {
    const FileStore = useFileStore();
    const deactivate = window.electron.ipcRenderer.on('onShortcutSwitchTabRight', () => {
        const ActiveElement = <HTMLElement>document.activeElement;
        ActiveElement?.blur?.();
        FileStore.switchActiveFileInd('inc');
    });

    onUnmounted(() => {
        deactivate();
    });
};
