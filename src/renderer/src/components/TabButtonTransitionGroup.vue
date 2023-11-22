<script setup lang="ts">
import { useTabTransition } from '@composables/useTabTransition';

const { onBeforeEnter, onEnter, onLeave } = useTabTransition();
</script>
<template>
    <TransitionGroup
        class="flex"
        tag="ul"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
    >
        <slot></slot>
    </TransitionGroup>
</template>
