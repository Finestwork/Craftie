<script setup lang="ts">
import MaterialOcean from '../themes/MaterialOcean';

// NPM
import { ref, watch } from 'vue';
import { editor } from 'monaco-editor';
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;
import { onMounted, unref } from 'vue';

const Props = defineProps({
    code: {
        type: String,
        required: true
    }
});
const editorWrapper = ref();
let scssEditor: null | editor.IStandaloneCodeEditor = null;

onMounted(async () => {
    const EditorOptions: IStandaloneEditorConstructionOptions = {
        value: Props.code,
        language: 'scss',
        theme: 'ocean',
        fontSize: 14,
        fontFamily: 'JetBrains Mono',
        lineHeight: 25,
        fontWeight: '600',
        cursorSmoothCaretAnimation: 'on',
        cursorBlinking: 'solid',
        tabSize: 0,
        fontLigatures: true,
        lineNumbers: 'off',
        glyphMargin: false,
        folding: false,
        minimap: {
            enabled: false
        }
    };
    editor.defineTheme('ocean', MaterialOcean);
    scssEditor = editor.create(unref(editorWrapper), EditorOptions);
});

watch(
    () => Props.code,
    (code) => {
        scssEditor?.setValue(code);
    },
    { flush: 'post' }
);
</script>

<template>
    <div ref="editorWrapper" class="h-full w-full"></div>
</template>
