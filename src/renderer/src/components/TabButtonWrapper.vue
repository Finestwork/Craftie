<script setup lang="ts">
import TabButtonTransitionGroup from '@components/TabButtonTransitionGroup.vue';
import BaseTabButton from '@components/BaseTabButton.vue';
import AddFileTabButton from '@components/AddFileTabButton.vue';

import { useCloseActiveTab } from '@composables/ipcListeners/useCloseActiveTab';
import { navigateOnKeyLeft, navigateOnKeyRight } from '@composables/ipcListeners/useSwitchTab';
import { useFileStore } from '@renderer/stores/FileStore';

// NPM
import { computed, watch, ref } from 'vue';
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

useCloseActiveTab();
navigateOnKeyLeft();
navigateOnKeyRight();
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
        <Splide ref="splide" class="w-full" :options="SplideOptions">
            <TabButtonTransitionGroup>
                <SplideSlide v-for="(file, ind) in FileNames" :key="file.id">
                    <BaseTabButton
                        :is-active="FileStore.currentActiveFileInd === ind"
                        :file-type="file.type"
                        :index="ind"
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
