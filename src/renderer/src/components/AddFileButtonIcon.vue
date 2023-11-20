<script setup lang="ts">
import PlusIcon from '@components/PlusIcon.vue';

const Props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
});
</script>
<template>
    <button
        class="group block h-[36px] w-[38px] p-[12px] hover:bg-tab-hover focus:bg-tab-hover"
        :class="{
            'group-active bg-tab-hover': Props.isActive,
            'group-inactive bg-[#1a1e2b]': !Props.isActive
        }"
        type="button"
    >
        <PlusIcon
            class="group-hover:stroke-tab-foreground-hover group-focus:stroke-tab-foreground-hover"
            :class="{
                'stroke-tab-foreground-hover': Props.isActive,
                'stroke-[#3d4768]': !Props.isActive
            }"
        />
    </button>
</template>
