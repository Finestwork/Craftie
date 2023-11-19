<script setup lang="ts">
import TitleBar from '@components/TitleBar.vue';
import Editor from '@components/Editor.vue';
import ResultPanel from '@components/ResultPanel.vue';
import RunButton from '@components/RunButton.vue';
import TabButtonWrapper from '@components/TabButtonWrapper.vue';

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
  <div class="h-full" ref="mainWrapper">
    <TabButtonWrapper />
    <div class="flex relative h-full">
      <div class="relative h-full w-6/12 min-w-[350px] shrink-0">
        <Editor />
        <RunButton />
      </div>
      <span class="block absolute h-full w-[1.5px] left-1/2 bg-button-dark cursor-col-resize"></span>
      <ResultPanel />
    </div>
  </div>
</template>
