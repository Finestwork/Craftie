<script setup lang="ts">
import RunButtonIcon from '@components/RunButtonIcon.vue';
</script>
<template>
  <button
    class="absolute top-2 right-2 z-50 bg-button-dark flex items-center block px-3 py-2 rounded-md shadow-button-dark-float hover:bg-button-dark-hover hover:shadow-button-dark-float-hover"
    type="button"
  >
    <span class="w-[8px] block mr-2">
      <RunButtonIcon />
    </span>
    <span class="font-bold text-button-text-dark text-xs">Run</span>
  </button>
</template>
