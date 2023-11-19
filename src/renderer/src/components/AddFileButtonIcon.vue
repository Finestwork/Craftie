<script setup lang="ts">
import PlusIcon from '@components/PlusIcon.vue';
</script>
<template>
    <button
        class="group block h-[36px] w-[38px] bg-[#292e3f] p-[12px] hover:bg-tab-hover focus:bg-tab-hover"
        type="button"
    >
        <PlusIcon
            class="stroke-[#5f6684] group-hover:stroke-tab-foreground-hover group-focus:stroke-tab-foreground-hover"
        />
    </button>
</template>
