<script setup lang="ts">
import BaseTabButton from '@components/BaseTabButton.vue';
import AddFileButtonIcon from '@components/AddFileButtonIcon.vue';
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
});
const FileNames = computed(() => {
    return FileStore.files.map((file) => {
        const FileName = file.fileName;
        return {
            name: FileName.trim() === '' ? 'Unsaved Work' : FileName,
            type: file.type
        };
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
            <SplideSlide v-for="(file, ind) in FileNames" :key="`${file.name}${ind}`">
                <BaseTabButton
                    :is-active="FileStore.currentActiveFileInd === ind"
                    :file-type="file.type"
                    @close-file="FileStore.deleteFileByIndex(ind)"
                    @switch-tab="FileStore.currentActiveFileInd = ind"
                >
                    <template #name>{{ file.name }}</template>
                </BaseTabButton>
            </SplideSlide>
            <SplideSlide>
                <AddFileButtonIcon @click="FileStore.addNewFile('js')" />
            </SplideSlide>
        </Splide>
    </div>
</template>

<style>
@import '@splidejs/vue-splide/css/core';
</style>
