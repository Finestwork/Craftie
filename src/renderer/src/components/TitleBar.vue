<script setup lang="ts">
import TitleBarCloseButton from '@components/TitleBarCloseButton.vue';
import TitleBarMaximizeButton from '@components/TitleBarMaximizeButton.vue';
</script>

<template>
  <div
    class="drag-region fixed left-0 top-0 z-50 flex w-full select-none justify-between bg-title-bar-dark"
  >
    <div></div>
    <div class="no-drag-region flex">
      <TitleBarMaximizeButton />
      <TitleBarCloseButton />
    </div>
  </div>
</template>
