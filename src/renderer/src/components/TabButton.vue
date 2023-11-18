<script setup lang="ts">
import JavaScriptIcon from '@components/JavaScriptIcon.vue';
import XCloseIcon from '@components/XCloseIcon.vue';

// NPM
import { nextTick, ref } from 'vue';
import { useElementSize } from '@vueuse/core/index';

let showCloseBtn = ref(false);
let closeBtn = ref();
let tabBtnTxt = ref();

const onMouseEnter = async () => {
  showCloseBtn.value = true;
  await nextTick();
  const { width } = useElementSize(closeBtn);
  Object.assign(tabBtnTxt.value.style, {
    marginRight: `${width.value}px`
  });
};
const onMouseLeave = () => {
  showCloseBtn.value = false;

  Object.assign(tabBtnTxt.value.style, {
    marginRight: null
  });
};
</script>

<template>
  <div class="relative" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <button
      class="hover:bg-tab-hover focus:bg-tab-hover group flex w-full items-center px-4 py-2"
      type="button"
      ref="tabBtn"
    >
      <span class="mr-2 block w-[12px]">
        <JavaScriptIcon class="group-hover:fill-tab-foreground-hover fill-[#F7DF1E]" />
      </span>
      <span
        ref="tabBtnTxt"
        class="text-tab-foreground group-hover:text-tab-foreground-hover group-focus:text-tab-foreground-hover text-sm font-semibold"
        >index.js</span
      >
    </button>
    <button
      class="hover:bg-tab-foreground-hover focus:bg-tab-foreground-hover group absolute right-2 top-1/2 ml-4 block w-[16px] -translate-y-1/2 rounded-full bg-[#777F9E] p-1"
      :class="{ hidden: !showCloseBtn }"
      type="button"
      ref="closeBtn"
    >
      <XCloseIcon class="stroke-tab-foreground group-hover:stroke-white group-focus:stroke-white" />
    </button>
  </div>
</template>
