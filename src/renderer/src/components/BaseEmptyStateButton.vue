<script setup lang="ts">
import BaseSlideUpToolTip from '@components/BaseSlideUpToolTip.vue';
</script>
<template>
    <BaseSlideUpToolTip>
        <button
            class="group mr-5 h-[50px] w-[70px] rounded-md bg-[#292D40] p-2 hover:bg-tab-hover focus:bg-tab-hover"
            ref="reference"
            type="button"
        >
            <span
                class="fill-[#5E668D] group-hover:fill-tab-foreground-hover group-focus:fill-tab-foreground-hover"
            >
                <slot></slot>
            </span>
        </button>

        <template #tooltip>
            <slot name="tooltip"></slot>
        </template>
    </BaseSlideUpToolTip>
</template>
