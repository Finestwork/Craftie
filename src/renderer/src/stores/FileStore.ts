import { defineStore } from 'pinia';

type TFileType = 'js' | 'sass';
type TFile = {
    type: TFileType;
    fileName: string;
    content: string;
};
export const useFileStore = defineStore('fileStore', {
    state: () => ({
        files: [] as TFile[]
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
            console.log(index);
            this.files.splice(index, 1);
        }
    },
    getters: {
        areFilesEmpty(state) {
            return state.files.length === 0;
        }
    }
});
