<script setup lang="ts">
import TitleBar from '@components/TitleBar.vue';
import Editor from '@components/Editor.vue';
import RunButton from '@components/RunButton.vue';

import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useElementBounding } from '@vueuse/core';

const nav = ref(null);
const mainWrapper = ref(null);
const addPadding = () => {
  if (mainWrapper.value === null) return;
  const { height } = useElementBounding(nav);
  const MainWrapper = <HTMLDivElement>mainWrapper.value;
  const Height = height.value;
  Object.assign(MainWrapper.style, {
    paddingTop: `${Height}px`
  });
};
onMounted(async () => {
  await nextTick();
  addPadding();
  window.addEventListener('resize', addPadding);
});
onUnmounted(() => {
  window.removeEventListener('resize', addPadding);
});
</script>

<template>
  <TitleBar ref="nav" />
  <div class="h-screen relative" ref="mainWrapper">
    <Editor />
    <RunButton />
  </div>
</template>
