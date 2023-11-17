<script setup lang="ts">
import TitleBarCloseButtonIcon from '@components/TitleBarCloseButtonIcon.vue';

const onClickCloseElectron = () => {
  window.api.closeApp();
};
</script>

<template>
  <button
    class="group z-50 flex h-[35px] w-[45px] items-center justify-center bg-blue-500 bg-transparent p-3 hover:bg-rose-600 focus:bg-rose-600"
    type="button"
    @click="onClickCloseElectron"
  >
    <TitleBarCloseButtonIcon
      class="stroke-[#6A7080] group-hover:stroke-white group-focus:stroke-white"
    />
  </button>
</template>
