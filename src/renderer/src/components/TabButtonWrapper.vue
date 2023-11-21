<script setup lang="ts">
import TabButtonTransitionGroup from '@components/TabButtonTransitionGroup.vue';
import BaseTabButton from '@components/BaseTabButton.vue';
import AddFileTabButton from '@components/AddFileTabButton.vue';

// Store
import { useFileStore } from '@renderer/stores/FileStore';

// NPM
import { computed, onMounted, watch, ref } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';

const FileStore = useFileStore();
const splide = ref();
const SplideOptions = {
    controls: false,
    arrows: false,
    autoWidth: true,
    drag: false,
    pagination: false,
    live: false
};
const FileNames = computed(() => {
    return FileStore.files.map((file) => {
        const FileName = file.fileName;
        return {
            id: file.id,
            name: FileName.trim() === '' ? 'Unsaved Work' : FileName,
            type: file.type
        };
    });
});

onMounted(() => {
    window.electron.ipcRenderer.on('onShortcutSwitchTabLeft', () => {
        const ActiveElement = <HTMLElement>document.activeElement;
        ActiveElement?.blur?.();
        FileStore.switchActiveFileInd('dec');
    });
    window.electron.ipcRenderer.on('onShortcutSwitchTabRight', () => {
        const ActiveElement = <HTMLElement>document.activeElement;
        ActiveElement?.blur?.();
        FileStore.switchActiveFileInd('inc');
    });
    window.electron.ipcRenderer.on('closeActiveTab', () => {
        if (FileStore.areFilesEmpty) return;
        FileStore.deleteCurrentActiveFile();
    });
});
watch(
    () => FileStore.currentActiveFileInd,
    (value: number) => {
        const SplideController = splide.value.splide.Components.Controller;
        SplideController.go(value);
    },
    { flush: 'post' }
);
</script>

<template>
    <div class="flex w-full bg-editor-dark">
        <Splide class="w-full" :options="SplideOptions" ref="splide">
            <TabButtonTransitionGroup>
                <SplideSlide v-for="(file, ind) in FileNames" :key="file.id">
                    <BaseTabButton
                        :is-active="FileStore.currentActiveFileInd === ind"
                        :file-type="file.type"
                        @close-file="FileStore.deleteFileByIndex(ind)"
                        @switch-tab="FileStore.currentActiveFileInd = ind"
                    >
                        <template #name>{{ file.name }}</template>
                    </BaseTabButton>
                </SplideSlide>
            </TabButtonTransitionGroup>
            <SplideSlide>
                <AddFileTabButton />
            </SplideSlide>
        </Splide>
    </div>
</template>

<style>
@import '@splidejs/vue-splide/css/core';
</style>
