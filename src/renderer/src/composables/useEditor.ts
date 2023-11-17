import MaterialOcean from '../themes/MaterialOcean';

// NPM
import { editor } from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import TypescriptWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

export const init = (editorWrapper: HTMLDivElement) => {
  const EditorOptions = {
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
    fontLigatures: true
  };
  let myEditor: editor.IStandaloneCodeEditor | null = null;
  editor.defineTheme('ocean', MaterialOcean);
  myEditor = editor.create(editorWrapper, EditorOptions);
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

  return myEditor;
};
