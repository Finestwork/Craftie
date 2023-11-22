<script setup lang="ts">
import BaseTabButton from '@components/BaseTabButton.vue';
import { useFileStore } from '@renderer/stores/FileStore';
import { useTabTransition } from '@composables/useTabTransition';
import { useScrollFileTab } from '@composables/ipcListeners/useScrollFileTab';
import { useSortable } from '@vueuse/integrations/useSortable';
import { computed, ref, nextTick, onMounted } from 'vue';

const { onBeforeEnter, onEnter, onLeave } = useTabTransition();
const FileStore = useFileStore();
const tabWrapper = ref();
const scrollWrapper = ref();
const FileNames = computed({
    get() {
        return FileStore.files;
    },
    set(value) {
        FileStore.files = value;
    }
});
useScrollFileTab(scrollWrapper);
onMounted(async () => {
    await nextTick();
    useSortable(tabWrapper.value.$el, FileNames);
});
</script>

<template>
    <div ref="tabWrapper" class="flex overflow-hidden">
        <TransitionGroup
            ref="scrollWrapper"
            class="hide-scrollbar flex max-w-full overflow-scroll"
            tag="ul"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @leave="onLeave"
        >
            <li v-for="(file, ind) in FileNames" :key="file.id">
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
