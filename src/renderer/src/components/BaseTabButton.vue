<script setup lang="ts">
import JavaScriptIcon from '@components/JavaScriptIcon.vue';
import SassIcon from '@components/SassIcon.vue';
import XCloseIcon from '@components/XCloseIcon.vue';
import { useFileStore } from '@renderer/stores/FileStore';

// NPM
import { computed, nextTick, ref } from 'vue';
import { useElementSize } from '@vueuse/core/index';

const Props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
});
const FileStore = useFileStore();
const showCloseBtn = ref(false);
const closeBtn = ref();
const tabBtnTxt = ref();

const closeFile = () => {
    FileStore.deleteFileByIndex(Props.index);
};
const switchTab = () => {
    FileStore.currentActiveFileInd = Props.index;
};
const hasFileChanged = computed(() => {
    const File = FileStore.getCurrentFile;
    return FileStore.currentActiveFileInd === Props.index && File.content !== File.previousContent;
});

const onMouseEnter = async () => {
    showCloseBtn.value = true;
    await nextTick();
    if (!tabBtnTxt.value) return;
    const { width } = useElementSize(closeBtn);
    Object.assign(tabBtnTxt.value.style, {
        marginRight: `${width.value}px`
    });
};
const onMouseLeave = () => {
    showCloseBtn.value = false;

    if (!tabBtnTxt.value) return;
    Object.assign(tabBtnTxt.value.style, {
        marginRight: null
    });
};

const getComponent = computed(() => {
    return Props.fileType === 'js' ? JavaScriptIcon : Props.fileType === 'scss' ? SassIcon : '';
});
</script>

<template>
    <div class="relative" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <button
            ref="tabBtn"
            class="group relative flex h-full w-full items-center px-4 py-2 outline-none hover:bg-tab-hover focus:bg-tab-hover"
            type="button"
            @click="switchTab"
        >
            <span
                v-if="Props.isActive"
                class="absolute bottom-0 left-0 h-[2px] w-full bg-button-dark-hover"
            ></span>
            <span class="mr-2 block w-[12px]">
                <Component
                    :is="getComponent"
                    class="fill-tab-foreground group-hover:fill-tab-foreground-hover group-focus:fill-tab-foreground-hover"
                />
            </span>
            <span
                ref="tabBtnTxt"
                class="whitespace-nowrap text-sm font-semibold text-tab-foreground group-hover:text-tab-foreground-hover group-focus:text-tab-foreground-hover"
            >
                <slot name="name"></slot>
                {{ hasFileChanged ? '*' : null }}
            </span>
        </button>
        <button
            ref="closeBtn"
            class="group absolute right-2 top-1/2 ml-4 block w-[16px] -translate-y-1/2 rounded-full bg-[#777F9E] p-1 hover:bg-tab-foreground-hover focus:bg-tab-foreground-hover"
            :class="{ hidden: !showCloseBtn }"
            type="button"
            @click="closeFile"
        >
            <XCloseIcon
                class="stroke-tab-foreground group-hover:stroke-white group-focus:stroke-white"
            />
        </button>
    </div>
</template>
