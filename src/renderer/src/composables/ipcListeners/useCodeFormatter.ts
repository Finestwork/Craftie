import { format } from "prettier/standalone";
import parseBabel from "prettier/plugins/babel";
import parserEstree from "prettier/plugins/estree";
import { onUnmounted, ref } from "vue";
import { useFileStore } from "@renderer/stores/FileStore";

const createJavaScriptPrettierOptions = async (code: string) => {
    return await format(code, {
        parser: "babel",
        singleQuote: true,
        trailingComma: "all",
        plugins: [parseBabel, parserEstree]
    });
};
export const formatCode = () => {
    const formattedCode = ref("");
    const FileStore = useFileStore();
    const CurrentFile = FileStore.getCurrentFile;
    const deactivate = window.electron.ipcRenderer.on("onShortcutReformatCode", async () => {
        if (CurrentFile.type === "js") {
            formattedCode.value = await createJavaScriptPrettierOptions(CurrentFile.content);
            return;
        }
    });

    onUnmounted(() => {
        deactivate();
    });

    return { formattedCode };
};
