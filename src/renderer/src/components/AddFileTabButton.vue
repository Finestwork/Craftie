<script setup lang="ts">
import BaseButtonDropdown from '@components/BaseButtonDropdown.vue';
import AddFileButtonIcon from '@components/AddFileButtonIcon.vue';
import TabButtonDropdown from '@components/TabButtonDropdown.vue';

// NPM
import { nextTick, onMounted, ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

const target = ref();
const tabButtonDropdown = ref();
const showDropdown = ref(false);
const { activate, deactivate } = useFocusTrap(tabButtonDropdown);

const handleFocusElement = (e) => {
    // If dropdown is not shown up, do nothing
    if (!showDropdown.value) return;

    const CurrentElement = <HTMLElement>document.activeElement;
    if (e.key.toLowerCase() === 'arrowdown') {
        const NextElement = <HTMLElement>CurrentElement.nextElementSibling;
        if (!NextElement) {
            const ParentElement = <HTMLElement>CurrentElement.parentElement;
            const FirstChild = <HTMLElement>ParentElement.firstElementChild;
            if (!FirstChild) return;
            FirstChild.focus();
            return;
        }
        NextElement.focus();
    }
    if (e.key.toLowerCase() === 'arrowup') {
        const PreviousElement = <HTMLElement>CurrentElement.previousElementSibling;
        if (!PreviousElement) {
            const ParentElement = <HTMLElement>CurrentElement.parentElement;
            const FirstChild = <HTMLElement>ParentElement.lastElementChild;
            if (!FirstChild) return;
            FirstChild.focus();
            return;
        }
        PreviousElement.focus();
    }
};

onMounted(() => {
    window.electron.ipcRenderer.on('onShortcutOpenTabDropdown', () => {
        showDropdown.value = true;
    });
    window.electron.ipcRenderer.on('onShortcutCloseTabDropdown', () => {
        showDropdown.value = false;
    });
    document.body.addEventListener('keydown', handleFocusElement);
});

onClickOutside(target, () => {
    showDropdown.value = false;
});
watch(
    () => showDropdown.value,
    async (isActive) => {
        await nextTick();
        if (isActive) activate();
        else deactivate();
    },
    { flush: 'post' }
);
</script>

<template>
    <BaseButtonDropdown :show="showDropdown">
        <AddFileButtonIcon
            ref="target"
            :is-active="showDropdown"
            @click="showDropdown = !showDropdown"
        />
        <template #float>
            <div ref="tabButtonDropdown">
                <TabButtonDropdown @click="showDropdown = false" />
            </div>
        </template>
    </BaseButtonDropdown>
</template>
