<script setup lang="ts">
import BaseShortcutMessageKbd from '@components/BaseShortcutMessageKbd.vue';
</script>
<template>
    <p class="text-xs font-bold text-tab-foreground">
        <slot></slot>
        <BaseShortcutMessageKbd>
            <slot name="key1"></slot>
        </BaseShortcutMessageKbd>
        +
        <BaseShortcutMessageKbd>
            <slot name="key2"></slot>
        </BaseShortcutMessageKbd>
    </p>
</template>
