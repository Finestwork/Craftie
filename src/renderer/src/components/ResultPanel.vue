<script setup lang="ts">
import ScssResult from '@components/ScssResult.vue';
// NPM
import { ref } from 'vue';

const codeArr = ref([]);
window.electron.ipcRenderer.on('displayCodeResult', (_, codeResult) => {
    codeArr.value = codeResult.slice();
});
</script>

<template>
    <div class="scrollbar h-full bg-editor-dark pl-[10px] font-jb text-sm font-semibold text-white">
        <div class="h-full overflow-y-scroll pb-4" v-if="Array.isArray(codeArr)">
            <p v-for="(code, ind) in codeArr" :key="`${code}${ind}`" class="mb-2 last-of-type:mb-0">
                {{ code }}
            </p>
        </div>
        <template v-else>
            <ScssResult :code="codeArr" />
        </template>
    </div>
</template>
