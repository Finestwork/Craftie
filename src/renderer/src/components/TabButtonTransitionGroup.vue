<script setup lang="ts">
import BaseTabButton from '@components/BaseTabButton.vue';
import { useFileStore } from '@renderer/stores/FileStore';
import { useTabTransition } from '@composables/useTabTransition';
import { useScrollFileTab } from '@composables/ipcListeners/useScrollFileTab';
import { useSortable, moveArrayElement } from '@vueuse/integrations/useSortable';
import { computed, nextTick, ref } from 'vue';

const { onBeforeEnter, onEnter, onLeave } = useTabTransition();
const FileStore = useFileStore();
const tabWrapper = ref();
const scrollWrapper = ref();
const Files = computed({
    get() {
        return FileStore.files;
    },
    set(value) {
        FileStore.files = value;
    }
});
useScrollFileTab(scrollWrapper);
useSortable(scrollWrapper, Files, {
    async onUpdate(e) {
        await nextTick();
        moveArrayElement(Files.value, e.oldIndex, e.newIndex);
        FileStore.currentActiveFileInd = e.newIndex;
    }
});
</script>

<template>
    <div ref="tabWrapper" class="flex overflow-hidden">
        <TransitionGroup
            ref="scrollWrapper"
            class="hide-scrollbar relative z-50 flex max-w-full overflow-scroll"
            tag="ul"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @leave="onLeave"
        >
            <li v-for="(file, ind) in Files" :key="file.id">
                <BaseTabButton
                    :is-active="FileStore.currentActiveFileInd === ind"
                    :file-type="file.type"
                    :index="ind"
                >
                    <template #name>
                        {{ file.fileName.trim() === '' ? 'Unsaved file' : file.fileName }}
                    </template>
                </BaseTabButton>
            </li>
        </TransitionGroup>
    </div>
</template>
