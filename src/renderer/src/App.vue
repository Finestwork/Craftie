<script setup lang="ts">
import TheCodeFiles from '@components/TheCodeFiles.vue';
import TheEmptyState from '@components/TheEmptyState.vue';
</script>

<template>
    <TheCodeFiles v-if="true" />
    <TheEmptyState v-else />
</template>
