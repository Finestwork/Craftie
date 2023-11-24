<script setup lang="ts">
const Props = defineProps({
    active: {
        type: Boolean,
        required: true
    }
});
</script>
<template>
    <button
        class="group flex h-[25px] w-[25px] items-center rounded-md p-1 hover:bg-tab-hover focus:bg-tab-hover"
        type="button"
        :class="{ 'bg-tab-hover': Props.active }"
    >
        <span
            class="stroke-[#b8bccf] group-hover:stroke-tab-foreground-hover group-focus:stroke-tab-foreground-hover"
            :class="{ 'stroke-tab-foreground-hover': Props.active }"
        >
            <slot></slot>
        </span>
    </button>
</template>
