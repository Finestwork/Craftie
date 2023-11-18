<script setup lang="ts">
import TitleBarLogo from '@components/TitleBarLogo.vue';
</script>

<template>
  <div
    class="drag-region fixed left-0 top-0 z-50 flex h-[32px] w-full select-none justify-between bg-title-bar-dark"
  >
    <div class="no-drag-region flex">
      <TitleBarLogo />
    </div>
  </div>
</template>
