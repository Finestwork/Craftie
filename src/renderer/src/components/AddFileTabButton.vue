<script setup lang="ts">
import BaseButtonDropdown from '@components/BaseButtonDropdown.vue';
import AddFileButtonIcon from '@components/AddFileButtonIcon.vue';
import TabButtonDropdown from '@components/TabButtonDropdown.vue';

import { useTabDropdownNavigation } from '@composables/useTabDropdownNavigation';

// NPM
import { nextTick, onMounted, ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

const target = ref();
const tabButtonDropdown = ref();
const showDropdown = ref(false);
const { activate, deactivate } = useFocusTrap(tabButtonDropdown);
const { activate: dropdownNavigationActivate, deactivate: dropdownNavigationDeactivate } =
    useTabDropdownNavigation(tabButtonDropdown);

onMounted(() => {
    window.electron.ipcRenderer.on('onShortcutOpenTabDropdown', () => {
        showDropdown.value = true;
    });
    window.electron.ipcRenderer.on('onShortcutCloseTabDropdown', () => {
        showDropdown.value = false;
    });
});

onClickOutside(target, () => {
    showDropdown.value = false;
});
watch(
    () => showDropdown.value,
    async (isActive) => {
        await nextTick();
        if (isActive) {
            activate();
            dropdownNavigationActivate();
        } else {
            deactivate();
            dropdownNavigationDeactivate();
        }
    },
    { flush: 'post' }
);
</script>

<template>
    <BaseButtonDropdown class="z-50" :show="showDropdown">
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
