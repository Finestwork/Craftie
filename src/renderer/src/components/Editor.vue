<script setup lang="ts">
import { init } from '@composables/useEditor';
import { nextTick, onMounted, ref } from 'vue';

const editorWrapper = ref(null);

onMounted(async () => {
  if (editorWrapper.value === null) return;
  await nextTick();
  init(editorWrapper.value);
});
</script>

<template>
  <div ref="editorWrapper" class="h-full w-full"></div>
</template>
