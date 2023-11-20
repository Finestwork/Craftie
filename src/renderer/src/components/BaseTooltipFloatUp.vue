<script setup lang="ts">
import anime from 'animejs/lib/anime';
import { computePosition } from '@floating-ui/dom';
import { ref } from 'vue';

const displayTooltip = ref(false);
const reference = ref();
const floating = ref();

const onBeforeEnter = (el) => {
    computePosition(reference.value, el).then(({ x, y }) => {
        Object.assign(el.style, {
            left: `${x}px`,
            top: `${y + 16}px`,
            opacity: 0
        });

        anime({
            targets: el,
            top: y,
            opacity: 1,
            duration: 350,
            easing: 'easeOutCubic'
        });
    });
};
const onLeave = (el, done) => {
    anime({
        targets: el,
        translateY: 14,
        opacity: 0,
        duration: 250,
        easing: 'easeOutCubic',
        complete: () => {
            // done();
        }
    });
};
</script>
<template>
    <div ref="reference" @mouseenter="displayTooltip = true" @mouseleave="displayTooltip = false">
        <slot></slot>

        <Teleport to="body">
            <Transition @before-enter="onBeforeEnter" @leave="onLeave">
                <div class="absolute" ref="floating" v-if="displayTooltip">
                    <slot name="float"></slot>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>
