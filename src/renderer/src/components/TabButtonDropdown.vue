<script setup lang="ts">
import TabButtonDropdownItem from '@components/TabButtonDropdownItem.vue';

import { useFileStore } from '@renderer/stores/FileStore';

const Emits = defineEmits(['click']);
const FileStore = useFileStore();

const onClickAddJavaScript = () => {
    FileStore.addNewFile('js');
    Emits('click');
};
const onClickAddSass = () => {
    FileStore.addNewFile('sass');
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
        <TabButtonDropdownItem @click="onClickAddSass"> Sass</TabButtonDropdownItem>
        <TabButtonDropdownItem @click="onClickAddScss"> Scss</TabButtonDropdownItem>
    </div>
</template>
