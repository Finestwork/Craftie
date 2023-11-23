<script setup lang="ts">
import ScssResult from '@components/ScssResult.vue';
import { displayResult } from '@composables/ipcListeners/useCodeHandler';

const { result, isError } = displayResult();
</script>

<template>
    <div class="scrollbar h-full bg-editor-dark pl-[10px] font-jb text-sm font-semibold text-white">
        <div v-if="Array.isArray(result)" class="h-full overflow-y-scroll pb-4">
            <p v-for="(code, ind) in result" :key="`${code}${ind}`" class="mb-2 last-of-type:mb-0">
                {{ code }}
            </p>
        </div>
        <template v-else>
            <ScssResult v-if="!isError" :code="result" />
            <pre v-else class="text-red-400">
                {{ result }}
            </pre>
        </template>
    </div>
</template>
