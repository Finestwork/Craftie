import MaterialOcean from '../themes/MaterialOcean';

// NPM
import { unref, Ref } from 'vue';
import { editor } from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import TypescriptWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;

export const initEditor = () => {
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
    editor.defineTheme('ocean', MaterialOcean);
    const createEditor = (editorWrapper: Ref<HTMLDivElement>): editor.IStandaloneCodeEditor => {
        const MyEditor = editor.create(unref(editorWrapper), EditorOptions);
        window.MonacoEnvironment = {
            getWorker(_, label) {
                if (label === 'typescript' || label === 'javascript') {
                    return new TypescriptWorker();
                }
                return new EditorWorker();
            }
        };

        return MyEditor;
    };

    return { createEditor };
};
