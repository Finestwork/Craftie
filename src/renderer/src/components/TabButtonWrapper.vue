<script setup lang="ts">
import TabButton from '@components/BaseTabButton.vue';
import AddFileButtonIcon from '@components/AddFileButtonIcon.vue';
import { useFileStore } from '@renderer/stores/FileStore';

// NPM
import { computed } from 'vue';

const FileStore = useFileStore();
const FileNames = computed(() => {
    return FileStore.files.map((file) => {
        const FileName = file.fileName;
        return FileName.trim() === '' ? 'Unsaved Work' : FileName;
    });
});
</script>

<template>
    <div class="flex w-full bg-editor-dark">
        <TabButton v-for="(name, ind) in FileNames" :key="`${name}${ind}`">
            <template #name>{{ name }}</template>
        </TabButton>
        <AddFileButtonIcon />
    </div>
</template>
