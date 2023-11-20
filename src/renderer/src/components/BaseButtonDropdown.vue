<script setup lang="ts">
import anime from 'animejs/lib/anime';
import { computePosition, shift } from '@floating-ui/dom';
import { ref } from 'vue';

const reference = ref();
const floatingEl = ref();

const Props = defineProps({
    show: {
        type: Boolean,
        required: true
    }
});
const onBeforeEnter = (el) => {
    const Middlewares = [shift()];
    computePosition(reference.value, el, { middleware: Middlewares }).then(({ x, y }) => {
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
            done();
        }
    });
};
</script>
<template>
    <div class="relative" ref="reference">
        <slot></slot>

        <Teleport to="body">
            <Transition @before-enter="onBeforeEnter" @leave="onLeave">
                <div class="absolute z-50" ref="floatingEl" v-if="Props.show">
                    <slot name="float"></slot>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>
