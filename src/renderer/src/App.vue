<script setup lang="ts">
import TitleBar from '@components/TitleBar.vue';
import Editor from '@components/Editor.vue';
import ResultPanel from '@components/ResultPanel.vue';
import RunButton from '@components/RunButton.vue';
import TabButtonWrapper from '@components/TabButtonWrapper.vue';

import { useAddPaddingTop } from '@composables/usePaddingHandler';
import { useResizePanel } from '@composables/useResizePanel';

import { onMounted, onUnmounted, ref } from 'vue';

const nav = ref();
const mainWrapper = ref();
const divider = ref();
useAddPaddingTop(mainWrapper, nav);
const {
  onMouseUpStopResize,
  onMouseDownResizePanel,
  onResizeUpdateLayout,
  isDragging,
  leftPanelWidth,
  rightPanelWidth
} = useResizePanel(divider);

onMounted(() => {
  // Divider initial position
  Object.assign(divider.value.style, {
    left: `leftPanelWidth`
  });
  window.addEventListener('resize', onResizeUpdateLayout);
});
onUnmounted(() => {
  window.removeEventListener('resize', onResizeUpdateLayout);
});
</script>

<template>
  <TitleBar ref="nav" />
  <div ref="mainWrapper" class="h-full">
    <TabButtonWrapper />
    <div class="relative flex h-[calc(100%-36px)]">
      <div class="relative h-full" :style="{ width: `${leftPanelWidth}px` }">
        <Editor :track-width="leftPanelWidth" />
        <RunButton />
      </div>
      <span
        ref="divider"
        class="duration-750 linear absolute left-1/2 block h-full w-[1.5px] cursor-col-resize transition-transform"
        :class="{
          'scale-y-150 bg-button-dark-hover': isDragging,
          'bg-button-dark': !isDragging
        }"
        @mousedown="onMouseDownResizePanel"
        @mouseup="onMouseUpStopResize"
      ></span>

      <ResultPanel :style="{ width: `${rightPanelWidth}px` }" />
    </div>
  </div>
</template>
