import { useFileStore } from '@renderer/stores/FileStore';
import { nextTick, onUnmounted } from 'vue';
import type { Ref, DefineComponent } from 'vue';

export const useScrollFileTab = (tabWrapper: Ref<DefineComponent>) => {
    const FileStore = useFileStore();
    const ShowActiveTab = async () => {
        await nextTick(); // React after DOM change
        const ScrollWrapper = tabWrapper.value.$el;
        const Children = ScrollWrapper.children;
        const ActiveChild = Children[FileStore.currentActiveFileInd];
        ActiveChild.scrollIntoView();
    };
    const deactivateSwitchTabLeft = window.electron.ipcRenderer.on(
        'onShortcutSwitchTabLeft',
        ShowActiveTab
    );
    const deactivateSwitchTabRight = window.electron.ipcRenderer.on(
        'onShortcutSwitchTabRight',
        ShowActiveTab
    );

    onUnmounted(() => {
        deactivateSwitchTabLeft();
        deactivateSwitchTabRight();
    });
};
