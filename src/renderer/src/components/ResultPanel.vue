<script setup lang="ts">
import { ref } from 'vue';

let codeArr = ref([]);
window.electron.ipcRenderer.on('displayCodeResult', (_, codeResult) => {
  codeArr.value = codeResult.slice();
});
</script>

<template>
  <div
    class="h-screen w-6/12 min-w-[350px] shrink-0 border-l-2 border-red-500 bg-editor-dark text-white"
  >
    <p v-for="code in codeArr" :key="code">
      {{ code }}
    </p>
  </div>
</template>
