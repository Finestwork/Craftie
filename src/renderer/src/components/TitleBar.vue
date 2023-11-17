<script setup lang="ts">
import TitleBarCloseButton from '@components/TitleBarCloseButton.vue';
</script>
<template>
  <div
    class="drag-region select-none fixed top-0 left-0 w-full z-50 bg-title-bar-dark flex justify-between"
  >
    <div></div>
    <div class="no-drag-region">
      <TitleBarCloseButton />
    </div>
  </div>
</template>
