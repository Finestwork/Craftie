<script setup lang="ts">
import { initEditor } from '@composables/useEditor';
import { useFileStore } from '@renderer/stores/FileStore';

// NPM
import { onMounted, ref, nextTick, watch, onUnmounted } from 'vue';
import { editor } from 'monaco-editor';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

const props = defineProps<{
    trackWidth: number;
}>();

const FileStore = useFileStore();
let monacoEditor: IStandaloneCodeEditor | null = null;
const editorWrapper = ref();
const { createEditor } = initEditor();

const updateLayoutOnResize = () => {
    monacoEditor?.layout();
};

const setEditorLanguage = () => {
    const File = FileStore.getCurrentFile;
    const Language = File.type === 'scss' ? 'scss' : File.type === 'js' ? 'javascript' : '';
    const Model = editor.createModel('', Language);
    monacoEditor?.setModel(Model);
};

onMounted(async () => {
    await nextTick();
    monacoEditor = createEditor(editorWrapper);
    monacoEditor.layout();
    monacoEditor.focus();
    setEditorLanguage();

    // Attach event listeners
    monacoEditor.onDidChangeModelContent(() => {
        const Code = monacoEditor?.getValue?.().trim() ?? '';
        FileStore.updateFileContent(Code);
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
watch(
    () => FileStore.currentActiveFileInd,
    () => {
        const File = FileStore.getCurrentFile;
        monacoEditor?.setValue(File.content);
        setEditorLanguage();
    }
);
</script>

<template>
    <div ref="editorWrapper" class="h-full w-full"></div>
</template>
