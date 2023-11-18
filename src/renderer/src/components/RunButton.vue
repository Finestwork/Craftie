<script setup lang="ts">
import RunButtonIcon from '@components/RunButtonIcon.vue';
</script>
<template>
  <button
    class="group absolute right-2 top-0 z-10 flex items-center rounded-md bg-button-dark px-3 py-2 shadow-button-dark-float hover:bg-button-dark-hover hover:shadow-button-dark-float-hover focus:bg-button-dark-hover focus:shadow-button-dark-float-hover"
    type="button"
  >
    <span class="mr-2 block w-[8px]">
      <RunButtonIcon class="fill-button-text-dark group-hover:fill-white group-focus:fill-white" />
    </span>
    <span
      class="text-xs font-bold text-button-text-dark group-hover:text-white group-focus:text-white"
      >Run</span
    >
  </button>
</template>
