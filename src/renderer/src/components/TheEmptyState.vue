<script setup lang="ts">
import BaseEmptyStateButton from '@components/BaseEmptyStateButton.vue';
import JavaScriptIcon from '@components/JavaScriptIcon.vue';
import SassIcon from '@components/SassIcon.vue';
</script>

<template>
    <div class="flex h-full items-center justify-center bg-editor-dark">
        <BaseEmptyStateButton>
            <JavaScriptIcon />
        </BaseEmptyStateButton>
        <BaseEmptyStateButton>
            <SassIcon />
        </BaseEmptyStateButton>
    </div>
</template>
