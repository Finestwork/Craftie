<script setup lang="ts">
import BaseTabButton from '@components/BaseTabButton.vue';
import AddFileButtonIcon from '@components/AddFileButtonIcon.vue';
import { useFileStore } from '@renderer/stores/FileStore';

// NPM
import { computed, onMounted } from 'vue';

const FileStore = useFileStore();

onMounted(() => {
    window.electron.ipcRenderer.on('onShortcutSwitchTabLeft', () => {
        FileStore.switchActiveFileInd('dec');
    });
    window.electron.ipcRenderer.on('onShortcutSwitchTabRight', () => {
        FileStore.switchActiveFileInd('inc');
    });
});
const FileNames = computed(() => {
    return FileStore.files.map((file) => {
        const FileName = file.fileName;
        return {
            name: FileName.trim() === '' ? 'Unsaved Work' : FileName,
            type: file.type
        };
    });
});
</script>

<template>
    <div class="flex w-full bg-editor-dark">
        <BaseTabButton
            v-for="(file, ind) in FileNames"
            :key="`${file.name}${ind}`"
            :is-active="FileStore.currentActiveFileInd === ind"
            :file-type="file.type"
            @close-file="FileStore.deleteFileByIndex(ind)"
            @switch-tab="FileStore.currentActiveFileInd = ind"
        >
            <template #name>{{ file.name }}</template>
        </BaseTabButton>
        <AddFileButtonIcon @click="FileStore.addNewFile('js')" />
    </div>
</template>
