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
        },
        switchActiveFileInd(operation: 'inc' | 'dec' = 'inc') {
            const CurrentFileLength = this.files.length - 1;
            if (operation === 'dec') {
                if (this.currentActiveFileInd === 0) {
                    this.currentActiveFileInd = CurrentFileLength;
                    return;
                }
                this.currentActiveFileInd--;
                return;
            }

            if (this.currentActiveFileInd === CurrentFileLength) {
                this.currentActiveFileInd = 0;
                return;
            }

            this.currentActiveFileInd++;
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
