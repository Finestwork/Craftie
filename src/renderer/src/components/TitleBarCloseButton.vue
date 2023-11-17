<script setup lang="ts">
import TitleBarCloseButtonIcon from '@components/TitleBarCloseButtonIcon.vue';

const onClickCloseElectron = () => {
  window.api.closeApp();
};
</script>

<template>
  <button
    class="flex w-[30px] h-[30px] justify-center bg-blue-500 z-50 items-center bg-transparent group hover:bg-rose-600"
    type="button"
    @click="onClickCloseElectron"
  >
    <TitleBarCloseButtonIcon class="group-hover:stroke-white stroke-[#6A7080]" />
  </button>
</template>
