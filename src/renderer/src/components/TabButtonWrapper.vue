<script setup lang="ts">
import TabButton from '@components/BaseTabButton.vue';
import AddFileButtonIcon from '@components/AddFileButtonIcon.vue';
import { useFileStore } from '@renderer/stores/FileStore';

// NPM
import { computed, ref } from 'vue';

const FileStore = useFileStore();
const CurrentActiveIndex = ref(0);
const onClickSwitchTab = (ind: number) => {
    CurrentActiveIndex.value = ind;
};
const FileNames = computed(() => {
    return FileStore.files.map((file) => {
        const FileName = file.fileName;
        return FileName.trim() === '' ? 'Unsaved Work' : FileName;
    });
});
</script>

<template>
    <div class="flex w-full bg-editor-dark">
        <TabButton
            v-for="(name, ind) in FileNames"
            :key="`${name}${ind}`"
            :is-active="CurrentActiveIndex === ind"
            @close-file="FileStore.deleteFileByIndex(ind)"
            @switch-tab="onClickSwitchTab(ind)"
        >
            <template #name>{{ name }}</template>
        </TabButton>
        <AddFileButtonIcon @click="FileStore.addNewFile" />
    </div>
</template>
