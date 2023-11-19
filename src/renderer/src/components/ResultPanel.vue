<script setup lang="ts">
import { ref } from 'vue';

let codeArr = ref([]);
window.electron.ipcRenderer.on('displayCodeResult', (_, codeResult) => {
  codeArr.value = codeResult.slice();
});
</script>

<template>
  <div
    class="h-screen w-6/12 min-w-[350px] shrink-0 bg-editor-dark pl-[10px] text-sm font-semibold font-jb text-white"
  >
    <p class="mb-2 last-of-type:mb-0" v-for="code in codeArr" :key="code">
      {{ code }}
    </p>
  </div>
</template>
