<script setup lang="ts">
import BaseEmptyStateButton from '@components/BaseEmptyStateButton.vue';
import JavaScriptIcon from '@components/JavaScriptIcon.vue';
import SassIcon from '@components/SassIcon.vue';
</script>

<template>
    <div class="relative flex h-full items-center justify-center bg-editor-dark">
        <BaseEmptyStateButton>
            <JavaScriptIcon />
            <template #tooltip>Create JavaScript File</template>
        </BaseEmptyStateButton>
        <BaseEmptyStateButton>
            <SassIcon />
            <template #tooltip>Create Sass File</template>
        </BaseEmptyStateButton>

        <p
            class="absolute bottom-4 left-0 w-full text-center text-sm font-medium text-tab-foreground"
        >
            Let's get that file created, and let the
            <span class="border-b-2 border-dashed border-[#9bddf7] text-[#9bddf7]"
                >coding adventure</span
            >
            begin!
        </p>
    </div>
</template>
