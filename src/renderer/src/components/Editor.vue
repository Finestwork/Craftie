<script setup lang="ts">
import {nextTick, onMounted, Ref, ref} from "vue";
import {editor} from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import TypescriptWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

let editorWrapper: Ref<HTMLDivElement | null> = ref(null);
let myEditor: editor.IStandaloneCodeEditor | null = null;

onMounted(async ()=> {
  if(editorWrapper === null) return;
  await nextTick();

  myEditor = editor.create(editorWrapper.value, {
    value: '',
    language: 'javascript',
    theme: 'palenight',
    fontSize: 16,
    fontFamily: 'JetBrains Mono',
    lineHeight: 35,
    fontWeight: '600',
    cursorSmoothCaretAnimation: 'on',
    cursorBlinking: 'expand',
    tabSize: 2,
    fontLigatures: true,
  });

  window.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === 'typescript' || label === 'javascript') {
        return new TypescriptWorker();
      }
      return new EditorWorker();
    }
  };
});
</script>

<template>
  <div class="h-screen" ref="editorWrapper"></div>
</template>
