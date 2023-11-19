import { defineStore } from 'pinia';

type TFileType = 'js' | 'sass';
type TFile = {
    type: TFileType;
    fileName: string;
    content: string;
};
export const useFileStore = defineStore('fileStore', {
    state: () => ({
        files: [] as TFile[],
        currentActiveFileInd: 0
    }),
    actions: {
        addNewFile(type: TFileType = 'js') {
            const File = {
                type: type,
                fileName: '',
                content: ''
            };
            this.files.push(File);
        },
        deleteFileByIndex(index: number) {
            this.files.splice(index, 1);
        },
        updateFileContent(content: string) {
            const CurrentIndex = this.currentActiveFileInd;
            this.files[CurrentIndex].content = content;
        }
    },
    getters: {
        areFilesEmpty(state) {
            return state.files.length === 0;
        },
        getCurrentFileContent(state) {
            return state.files[state.currentActiveFileInd].content;
        }
    }
});
