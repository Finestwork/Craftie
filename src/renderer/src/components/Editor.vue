<script setup lang="ts">
import { initEditor } from '@composables/useEditor';
import { formatCode } from '@composables/ipcListeners/useCodeFormatter';
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
const { formattedCode } = formatCode();

const updateLayoutOnResize = () => {
    monacoEditor?.layout();
};

const setEditorLanguage = () => {
    const File = FileStore.files[FileStore.currentActiveFileInd];
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
    monacoEditor.setValue(FileStore.files[FileStore.currentActiveFileInd].content);

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
    () => FileStore.files.length,
    (value, newValue) => {
        if (value === newValue) return;

        const File = FileStore.getCurrentFile;
        // Sometimes, file is already deleted in store
        if (!File) return;

        setEditorLanguage();
        monacoEditor?.setValue(File.content);
    }
);

watch(
    () => FileStore.currentActiveFileInd,
    () => {
        const File = FileStore.getCurrentFile;
        // Sometimes, file is already deleted in store
        if (!File) return;

        setEditorLanguage();
        monacoEditor?.setValue(File.content);
    }
);
watch(
    () => formattedCode.value,
    (code) => {
        monacoEditor?.setValue(code);
    }
);
</script>

<template>
    <div ref="editorWrapper" class="h-full w-full"></div>
</template>
