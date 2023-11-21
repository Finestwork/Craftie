import { unref, ref, Ref } from 'vue';

export const useTabDropdownNavigation = (wrapper: Ref<HTMLElement>) => {
    const buttons: Ref<NodeListOf<HTMLButtonElement>> | Ref<null> = ref(null);
    let currentActiveIndex = -1;

    const handleNavigation = (e: KeyboardEvent) => {
        if (buttons.value === null) return;

        const CurrentArrayLength = buttons.value.length - 1;
        if (e.key.toLowerCase() === 'arrowdown') {
            if (currentActiveIndex === CurrentArrayLength) {
                currentActiveIndex = 0;
            } else {
                currentActiveIndex++;
            }
        }

        if (e.key.toLowerCase() === 'arrowup') {
            if (currentActiveIndex === 0) {
                currentActiveIndex = CurrentArrayLength;
            } else {
                currentActiveIndex--;
            }
        }

        buttons.value[currentActiveIndex].focus();
    };

    const activate = () => {
        const Wrapper = unref(wrapper);
        buttons.value = Wrapper.querySelectorAll('button');
        currentActiveIndex = Array.from(buttons.value).findIndex(
            (button) => button === document.activeElement
        );
        currentActiveIndex = currentActiveIndex !== -1 ? currentActiveIndex : 0;

        document.body.addEventListener('keydown', handleNavigation);
    };
    const deactivate = () => {
        document.body.removeEventListener('keydown', handleNavigation);
    };

    return { activate, deactivate };
};
