import { format } from 'prettier/standalone';
import parseBabel from 'prettier/plugins/babel';
import parserEstree from 'prettier/plugins/estree';
import ScssParser from 'prettier/plugins/postcss';
import { onUnmounted, ref } from 'vue';
import { useFileStore } from '@renderer/stores/FileStore';

const createFormatOptions = async (type: 'js' | 'scss', code: string) => {
    if (type === 'js') {
        return await format(code, {
            parser: 'babel',
            singleQuote: true,
            trailingComma: 'all',
            plugins: [parseBabel, parserEstree]
        });
    }

    return await format(code, {
        parser: 'scss',
        singleQuote: true,
        trailingComma: 'all',
        plugins: [ScssParser]
    });
};
export const formatCode = () => {
    const formattedCode = ref('');
    const FileStore = useFileStore();
    const deactivate = window.electron.ipcRenderer.on('onShortcutReformatCode', async () => {
        const CurrentFile = FileStore.getCurrentFile;
        if (CurrentFile.type === 'js') {
            formattedCode.value =
                (await createFormatOptions(CurrentFile.type, CurrentFile.content)) || '';
            return;
        }

        if (CurrentFile.type === 'scss') {
            formattedCode.value =
                (await createFormatOptions(CurrentFile.type, CurrentFile.content)) || '';
        }
    });

    onUnmounted(() => {
        deactivate();
    });

    return { formattedCode };
};
