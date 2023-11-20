<script setup lang="ts">
import BaseButtonDropdown from '@components/BaseButtonDropdown.vue';
import AddFileButtonIcon from '@components/AddFileButtonIcon.vue';
import TabButtonDropdown from '@components/TabButtonDropdown.vue';

// NPM
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const target = ref();
const showDropdown = ref(false);

onClickOutside(target, () => {
    showDropdown.value = false;
});
</script>

<template>
    <BaseButtonDropdown :show="showDropdown">
        <AddFileButtonIcon
            ref="target"
            :is-active="showDropdown"
            @click="showDropdown = !showDropdown"
        />
        <template #float>
            <TabButtonDropdown @click="showDropdown = false" />
        </template>
    </BaseButtonDropdown>
</template>
