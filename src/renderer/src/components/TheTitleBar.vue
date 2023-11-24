<script setup lang="ts">
import TitleBarLogo from '@components/TitleBarLogo.vue';
import RightPanelIcon from '@components/RightPanelIcon.vue';
import LeftPanelIcon from '@components/LeftPanelIcon.vue';
import BottomPanelIcon from '@components/BottomPanelIcon.vue';
import TopPanelIcon from '@components/TopPanelIcon.vue';
import BaseTitleBarButtonIcon from '@components/BaseTitleBarButtonIcon.vue';
import { useResultPanelStore } from '@renderer/stores/ResultPanelStore';
import type { PanelPosition } from '@renderer/stores/ResultPanelStore';

const ResultPanelStore = useResultPanelStore();
const onClickChangeLayoutPosition = (type: PanelPosition) => {
    ResultPanelStore.position = type;
};
</script>

<template>
    <div
        class="drag-region select-non fixed left-0 top-0 z-50 flex h-[40px] w-full bg-title-bar-dark"
    >
        <div class="no-drag-region flex items-center pl-2.5">
            <TitleBarLogo />
            <BaseTitleBarButtonIcon
                :active="ResultPanelStore.atLeft"
                @click="onClickChangeLayoutPosition('left')"
            >
                <LeftPanelIcon />
            </BaseTitleBarButtonIcon>
            <BaseTitleBarButtonIcon
                :active="ResultPanelStore.atRight"
                @click="onClickChangeLayoutPosition('right')"
            >
                <RightPanelIcon />
            </BaseTitleBarButtonIcon>
            <BaseTitleBarButtonIcon
                :active="ResultPanelStore.atBottom"
                @click="onClickChangeLayoutPosition('bottom')"
            >
                <BottomPanelIcon />
            </BaseTitleBarButtonIcon>
            <BaseTitleBarButtonIcon
                :active="ResultPanelStore.atTop"
                @click="onClickChangeLayoutPosition('top')"
            >
                <TopPanelIcon />
            </BaseTitleBarButtonIcon>
        </div>
    </div>
</template>
