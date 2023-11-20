<script setup lang="ts">
import BaseFloatUp from '@components/BaseFloatUp.vue';
</script>
<template>
    <BaseFloatUp>
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
    </BaseFloatUp>
</template>
