import { defineStore } from 'pinia';
// NPM
import { v4 as uuidv4 } from 'uuid';

type TFileType = 'js' | 'scss';
type TFile = {
    id: number;
    type: TFileType;
    fileName: string;
    content: string;
    filePath: string;
};
export const useFileStore = defineStore('fileStore', {
    state: () => ({
        files: [] as TFile[],
        currentActiveFileInd: 0
    }),
    actions: {
        addNewFile(type: TFileType = 'js') {
            const File = {
                id: uuidv4(),
                type: type,
                fileName: '',
                content: '',
                filePath: ''
            };
            this.files.push(File);
        },
        deleteFileByIndex(index: number) {
            this.files.splice(index, 1);
            if (this.currentActiveFileInd === 0) return;
            this.currentActiveFileInd--;
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
        },
        setActiveFileNameAndPath(name: string, path: string) {
            this.files[this.currentActiveFileInd].filePath = path;
            this.files[this.currentActiveFileInd].fileName = name;
        }
    },
    getters: {
        areFilesEmpty(state) {
            return state.files.length === 0;
        },
        getCurrentFileContent(state) {
            return state.files[state.currentActiveFileInd].content;
        },
        getCurrentFile(state) {
            return state.files[state.currentActiveFileInd];
        }
    }
});
