<script setup lang="ts">
import TabButtonDropdownItem from '@components/TabButtonDropdownItem.vue';

import { useFileStore } from '@renderer/stores/FileStore';

const Emits = defineEmits(['click']);
const FileStore = useFileStore();

const onClickAddJavaScript = () => {
    FileStore.addNewFile('js');
    Emits('click');
};
const onClickAddScss = () => {
    FileStore.addNewFile('scss');
    Emits('click');
};
</script>

<template>
    <div class="overflow-hidden rounded-md bg-button-dark shadow-xl">
        <TabButtonDropdownItem @click="onClickAddJavaScript"> JavaScript</TabButtonDropdownItem>
        <TabButtonDropdownItem @click="onClickAddScss"> SCSS</TabButtonDropdownItem>
    </div>
</template>
