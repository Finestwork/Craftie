import MaterialOcean from '../themes/MaterialOcean';

// NPM
import { editor } from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import TypescriptWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;

export const init = (editorWrapper: HTMLDivElement) => {
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
    scrollbar: {
      vertical: 'hidden',
      horizontal: 'hidden',
      handleMouseWheel: false
    }
  };
  let myEditor: editor.IStandaloneCodeEditor | null = null;
  editor.defineTheme('ocean', MaterialOcean);
  myEditor = editor.create(editorWrapper, EditorOptions);
  myEditor.focus();
  myEditor.onDidChangeModelContent(() => {
    if (myEditor === null) return;
    // Todo: Store the value
  });

  window.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === 'typescript' || label === 'javascript') {
        return new TypescriptWorker();
      }
      return new EditorWorker();
    }
  };

  const updateLayout = () => {
    if (myEditor === null) return;
    myEditor.layout();
  };
  const dispose = () => {
    window.removeEventListener('resize', updateLayout);
    if (myEditor === null) return;
    myEditor.dispose();
  };

  window.addEventListener('resize', updateLayout);
  return {
    dispose
  };
};
