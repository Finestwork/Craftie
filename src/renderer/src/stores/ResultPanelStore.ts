import { defineStore } from 'pinia';
export type PanelPosition = 'left' | 'right' | 'top' | 'bottom';

export const useResultPanelStore = defineStore('resultPanelStore', {
    state: () => ({
        position: 'right' as PanelPosition
    })
});
