<script setup lang="ts">
import TitleBarMaximizeButtonIcon from '@components/TitleBarMaximizeButtonIcon.vue';

const onClickMaximizeApp = (e: MouseEvent) => {
  const Target = <HTMLButtonElement>e.target;
  Target.blur();
  window.api.maximizeApp();
};
</script>

<template>
  <button
    class="group z-50 flex h-[35px] w-[45px] items-center justify-center bg-blue-500 bg-transparent p-3 hover:bg-button-dark focus:bg-button-dark"
    type="button"
    @click="onClickMaximizeApp"
  >
    <TitleBarMaximizeButtonIcon
      class="stroke-[#6A7080] group-hover:stroke-white group-focus:stroke-white"
    />
  </button>
</template>
