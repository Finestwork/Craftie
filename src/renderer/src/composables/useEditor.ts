import MaterialOcean from '../themes/MaterialOcean';
import { useEditorStore } from '@renderer/stores/EditorStore';

// NPM
import { nextTick, onMounted, onUnmounted, Ref } from 'vue';
import { editor } from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import TypescriptWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;

export const init = (editorWrapper: Ref) => {
  const EditorOptions: IStandaloneEditorConstructionOptions = {
    value: '',
    language: 'javascript',
    theme: 'ocean',
    fontSize: 16,
    fontFamily: 'JetBrains Mono',
    lineHeight: 35,
    fontWeight: '600',
    cursorSmoothCaretAnimation: 'on',
    cursorBlinking: 'expand',
    tabSize: 2,
    fontLigatures: true,
    minimap: {
      enabled: false
    },
    scrollBeyondLastLine: false
  };
  let myEditor: editor.IStandaloneCodeEditor | null = null;
  editor.defineTheme('ocean', MaterialOcean);

  const updateLayout = () => {
    if (myEditor === null) return;
    myEditor.layout();
  };

  onMounted(async () => {
    await nextTick();
    const EditorStore = useEditorStore();
    myEditor = editor.create(editorWrapper.value, EditorOptions);
    myEditor.onDidChangeModelContent(() => {
      EditorStore.code = myEditor.getValue();
    });

    window.MonacoEnvironment = {
      getWorker(_, label) {
        if (label === 'typescript' || label === 'javascript') {
          return new TypescriptWorker();
        }
        return new EditorWorker();
      }
    };

    // Wait for VDom to be updated
    await nextTick();
    myEditor.layout();
    myEditor.focus();
    window.addEventListener('resize', updateLayout);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', updateLayout);
  });
};
