import { defineStore } from 'pinia';

type TFile = {
    type: 'js' | 'sass';
    fileName: string;
    content: string;
};
export const useFileStore = defineStore('fileStore', {
    state: () => ({
        files: [] as TFile[]
    }),
    getters: {
        areFilesEmpty(state) {
            return state.files.length === 0;
        }
    }
});
