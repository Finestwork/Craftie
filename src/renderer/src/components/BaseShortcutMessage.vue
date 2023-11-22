<script setup lang="ts">
import BaseShortcutMessageKbd from '@components/BaseShortcutMessageKbd.vue';
import type { PropType } from 'vue';

const Props = defineProps({
    keys: {
        type: Array as PropType<string[]>,
        required: true
    }
});
</script>
<template>
    <p class="text-xs font-bold text-tab-foreground">
        <slot></slot>
        <span class="ml-1.5">
            <template v-for="(key, ind) in Props.keys" :key="key">
                <template v-if="ind !== Props.keys.length - 1">
                    <BaseShortcutMessageKbd>
                        {{ key }}
                    </BaseShortcutMessageKbd>
                    +
                </template>
                <template v-else>
                    <BaseShortcutMessageKbd>
                        {{ key }}
                    </BaseShortcutMessageKbd>
                </template>
            </template>
        </span>
    </p>
</template>
