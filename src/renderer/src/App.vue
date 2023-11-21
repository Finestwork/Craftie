<script setup lang="ts">
import TheTitleBar from '@components/TheTitleBar.vue';
import TheCodeFiles from '@components/TheCodeFiles.vue';
import TheEmptyState from '@components/TheEmptyState.vue';
import { useFileOpenedListener } from '@composables/ipcListeners/useFileHandler';
import { useFileStore } from '@renderer/stores/FileStore';
import { useAddPaddingTop } from '@composables/usePaddingHandler';

// NPM
import { computed, ref } from 'vue';

const FileStore = useFileStore();
const nav = ref();
const mainWrapper = ref();
useAddPaddingTop(mainWrapper, nav);
useFileOpenedListener();

const displayCodeFiles = computed(() => !FileStore.areFilesEmpty);
</script>

<template>
    <TheTitleBar ref="nav" />
    <div ref="mainWrapper" class="h-full">
        <TheCodeFiles v-if="displayCodeFiles" />
        <TheEmptyState v-else />
    </div>
</template>
