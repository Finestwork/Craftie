<script setup lang="ts">
import { initEditor } from '@composables/useEditor';
import { useEditorStore } from '@renderer/stores/EditorStore';
// NPM
import { onMounted, ref, nextTick, watch, onUnmounted } from 'vue';
import { editor } from 'monaco-editor';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

const props = defineProps<{
    trackWidth: number;
}>();

const EditorStore = useEditorStore();
let monacoEditor: IStandaloneCodeEditor | null = null;
const editorWrapper = ref();
const { createEditor } = initEditor();

const updateLayoutOnResize = () => {
    monacoEditor?.layout();
};

onMounted(async () => {
    await nextTick();
    monacoEditor = createEditor(editorWrapper);
    monacoEditor.layout();
    monacoEditor.focus();

    // Attach event listeners
    monacoEditor.onDidChangeModelContent(() => {
        EditorStore.code = monacoEditor?.getValue?.().trim() ?? '';
    });
    window.addEventListener('resize', updateLayoutOnResize);
});

onUnmounted(() => {
    monacoEditor?.dispose();
    window.removeEventListener('resize', updateLayoutOnResize);
});

watch(
    () => props.trackWidth,
    () => {
        monacoEditor?.layout?.();
    },
    { flush: 'post' }
);
</script>

<template>
    <div ref="editorWrapper" class="h-full w-full"></div>
</template>
