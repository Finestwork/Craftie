<script setup lang="ts">
import BaseTooltipFloatUp from '@components/BaseTooltipFloatUp.vue';
</script>
<template>
    <BaseTooltipFloatUp>
        <template #default>
            <slot></slot>
        </template>

        <template #float>
            <span
                class="rounded-md bg-button-dark-hover px-2 py-2 text-xs font-semibold text-white"
            >
                <slot name="tooltip"></slot>
            </span>
        </template>
    </BaseTooltipFloatUp>
</template>
