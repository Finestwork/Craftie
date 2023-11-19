<script setup lang="ts">
import TheTitleBar from '@components/TheTitleBar.vue';
import TheCodeFiles from '@components/TheCodeFiles.vue';
import TheEmptyState from '@components/TheEmptyState.vue';
import { ref } from 'vue';
import { useAddPaddingTop } from '@composables/usePaddingHandler';

const nav = ref();
const mainWrapper = ref();
useAddPaddingTop(mainWrapper, nav);
</script>

<template>
    <TheTitleBar ref="nav" />
    <div class="h-full" ref="mainWrapper">
        <TheCodeFiles v-if="else" />
        <TheEmptyState v-else />
    </div>
</template>
