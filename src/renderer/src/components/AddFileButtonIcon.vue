<script setup lang="ts">
import PlusIcon from '@components/PlusIcon.vue';
</script>
<template>
    <button
        class="group block h-[36px] w-[38px] bg-[#1a1e2b] p-[12px] hover:bg-tab-hover focus:bg-tab-hover"
        type="button"
    >
        <PlusIcon
            class="stroke-[#3d4768] group-hover:stroke-tab-foreground-hover group-focus:stroke-tab-foreground-hover"
        />
    </button>
</template>
