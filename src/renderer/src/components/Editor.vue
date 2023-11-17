<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { editor } from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import TypescriptWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

const editorWrapper = ref(null)
let myEditor: editor.IStandaloneCodeEditor | null = null

onMounted(async () => {
  if (editorWrapper.value === null) return
  await nextTick()

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
    fontLigatures: true
  })

  myEditor.onDidChangeModelContent(() => {
    if (myEditor === null) return
    // Todo: Store the value
  })

  window.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === 'typescript' || label === 'javascript') {
        return new TypescriptWorker()
      }
      return new EditorWorker()
    }
  }
})
</script>

<template>
  <div ref="editorWrapper" class="h-screen"></div>
</template>
