<script setup lang="ts">
import Editor from '@components/Editor.vue';
import ResultPanel from '@components/ResultPanel.vue';
import RunButton from '@components/RunButton.vue';
import TabButtonWrapper from '@components/TabButtonWrapper.vue';
import {
    useSaveFileOnKeypress,
    useFileSuccessfullyStored,
    useSaveFileBeforeClosing
} from '@composables/ipcListeners/useSaveFile';
import { useResizePanel } from '@composables/useResizePanel';
import { onUnmounted, ref } from 'vue';

const wrapper = ref();
const divider = ref();
const {
    onMouseUpStopResize,
    onMouseDownResizePanel,
    onResizeUpdateLayout,
    isDragging,
    leftPanelSize,
    dividerStyle,
    leftPanelStyle,
    rightPanelStyle
} = useResizePanel(wrapper, divider);
useSaveFileOnKeypress();
useFileSuccessfullyStored();
useSaveFileBeforeClosing();

window.addEventListener('resize', onResizeUpdateLayout);
onUnmounted(() => {
    window.removeEventListener('resize', onResizeUpdateLayout);
});
</script>

<template>
    <TabButtonWrapper />
    <div ref="wrapper" class="relative z-10 flex h-[calc(100%-36px)]">
        <div class="absolute" :style="leftPanelStyle">
            <div class="relative h-full">
                <Editor :track-width="leftPanelSize" />
                <RunButton />
            </div>
        </div>
        <span
            ref="divider"
            class="duration-750 linear absolute z-[1] block transition-transform"
            :class="{
                'scale-y-150 bg-button-dark-hover': isDragging,
                'bg-button-dark': !isDragging
            }"
            :style="dividerStyle"
            @mousedown="onMouseDownResizePanel"
            @mouseup="onMouseUpStopResize"
        ></span>
        <div class="absolute" :style="rightPanelStyle">
            <ResultPanel />
        </div>
    </div>
</template>
