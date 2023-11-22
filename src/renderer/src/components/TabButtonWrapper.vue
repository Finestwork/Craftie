<script setup lang="ts">
import TabButtonTransitionGroup from '@components/TabButtonTransitionGroup.vue';
import AddFileTabButton from '@components/AddFileTabButton.vue';

import { useCloseActiveTab } from '@composables/ipcListeners/useCloseActiveTab';
import { navigateOnKeyLeft, navigateOnKeyRight } from '@composables/ipcListeners/useSwitchTab';

useCloseActiveTab();
navigateOnKeyLeft();
navigateOnKeyRight();
</script>

<template>
    <div class="flex w-full bg-editor-dark">
        <TabButtonTransitionGroup />
        <AddFileTabButton />
    </div>
</template>
