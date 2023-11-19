<script setup lang="ts">
import TheTitleBar from '@components/TheTitleBar.vue';
import TheCodeFiles from '@components/TheCodeFiles.vue';
import TheEmptyState from '@components/TheEmptyState.vue';
import { useFileStore } from '@renderer/stores/FileStore';
import { useAddPaddingTop } from '@composables/usePaddingHandler';

// NPM
import { ref } from 'vue';

const FileStore = useFileStore();
const nav = ref();
const mainWrapper = ref();
useAddPaddingTop(mainWrapper, nav);
</script>

<template>
    <TheTitleBar ref="nav" />
    <div class="h-full" ref="mainWrapper">
        <TheCodeFiles v-if="!FileStore.areFilesEmpty" />
        <TheEmptyState v-else />
    </div>
</template>
