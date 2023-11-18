<script setup lang="ts">
import { init } from '@composables/useEditor';
import { ref } from 'vue';

const editorWrapper = ref(null);
init(editorWrapper);
</script>

<template>
  <div ref="editorWrapper" class="h-full w-full"></div>
</template>
