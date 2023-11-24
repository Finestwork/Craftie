import { defineStore } from 'pinia';

export type PanelPosition = 'left' | 'right' | 'top' | 'bottom';

export const useResultPanelStore = defineStore('resultPanelStore', {
    state: () => ({
        position: 'right' as PanelPosition
    }),
    getters: {
        atTop(state) {
            return state.position === 'top';
        },
        atBottom(state) {
            return state.position === 'bottom';
        },
        atLeft(state) {
            return state.position === 'left';
        },
        atRight(state) {
            return state.position === 'right';
        },
        isHorizontal(state) {
            return state.position === 'right' || state.position === 'left';
        },
        isVertical(state) {
            return state.position === 'top' || state.position === 'bottom';
        }
    }
});
