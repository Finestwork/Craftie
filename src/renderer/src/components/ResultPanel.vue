<script setup lang="ts">
import { displayResult } from '@composables/ipcListeners/useCodeHandler';
import { computed } from 'vue';

const { result, isError } = displayResult();
const Code = computed(() => {
    if (Array.isArray(result.value)) {
        return result.value.join('\n');
    }
    return result.value;
});
</script>

<template>
    <div
        class="h-full overflow-y-scroll bg-editor-dark pl-[10px] font-jb text-sm font-semibold"
        :class="{ 'text-red-400': isError, 'text-white': !isError }"
    >
        <pre>{{ Code }}</pre>
    </div>
</template>
