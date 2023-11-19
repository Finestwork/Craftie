<script setup lang="ts">
import TitleBar from '@components/TitleBar.vue';
import Editor from '@components/Editor.vue';
import ResultPanel from '@components/ResultPanel.vue';
import RunButton from '@components/RunButton.vue';
import TabButtonWrapper from '@components/TabButtonWrapper.vue';

import { useAddPaddingTop } from './composables/usePaddingHandler';

import { ref } from 'vue';

const nav = ref();
const mainWrapper = ref();
useAddPaddingTop(mainWrapper, nav);

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
