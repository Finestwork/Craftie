import { useResultPanelStore } from '@renderer/stores/ResultPanelStore';
import { Ref, unref, ref, computed, watch, onMounted } from 'vue';

export function useResizePanel(wrapper: Ref<HTMLElement>, target: Ref<HTMLElement>) {
    const ResultPanelStore = useResultPanelStore();
    const isDragging = ref(false);
    const leftPanelSize = ref(0);
    const rightPanelSize = ref(0);
    const dividerStyle = computed(() => {
        if (ResultPanelStore.isHorizontal) {
            return {
                left: `${leftPanelSize.value}px`,
                height: '100%',
                width: '1.5px',
                cursor: 'col-resize'
            };
        }

        return {
            top: `${leftPanelSize.value}px`,
            width: '100%',
            height: '1.5px',
            cursor: 'row-resize'
        };
    });
    const leftPanelStyle = computed(() => {
        if (ResultPanelStore.atRight) {
            return { width: `${leftPanelSize.value}px`, height: '100%', left: 0 };
        }
        if (ResultPanelStore.atLeft) {
            return { width: `${rightPanelSize.value}px`, height: '100%', right: 0 };
        }
        if (ResultPanelStore.atTop) {
            return { width: '100%', height: `${rightPanelSize.value}px`, bottom: 0, left: 0 };
        }

        // Else it must be at the bottom
        return { width: '100%', height: `${leftPanelSize.value}px`, top: 0, left: 0 };
    });
    const rightPanelStyle = computed(() => {
        if (ResultPanelStore.atRight) {
            return { width: `${rightPanelSize.value}px`, height: '100%', right: 0 };
        }
        if (ResultPanelStore.atLeft) {
            return { width: `${leftPanelSize.value}px`, height: '100%', left: 0 };
        }
        if (ResultPanelStore.atTop) {
            return { width: '100%', height: `${leftPanelSize.value}px`, top: 0, left: 0 };
        }
        // Else it must be at the bottom
        return { width: '100%', height: `${rightPanelSize.value}px`, bottom: 0, left: 0 };
    });

    // Helpers
    const onMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        const Target = unref(target);

        if (ResultPanelStore.isHorizontal) {
            const MouseX = e.clientX;
            const TargetLeft = Target.getBoundingClientRect().left;
            const CurrentClientWidth = unref(wrapper).clientWidth;
            leftPanelSize.value = TargetLeft;
            rightPanelSize.value = CurrentClientWidth - TargetLeft;
            Object.assign(Target.style, {
                left: `${MouseX}px`
            });

            return;
        }

        const MouseY = e.clientY;
        const WrapperTop = unref(wrapper).offsetTop;
        const ClientHeight = unref(wrapper).clientHeight;
        leftPanelSize.value = MouseY - WrapperTop;
        rightPanelSize.value = ClientHeight - leftPanelSize.value;
        Object.assign(Target.style, {
            top: `${leftPanelSize.value}px`
        });
    };
    const cancelEvents = () => {
        isDragging.value = false;
        document.body.removeEventListener('mousemove', onMouseMove);
        document.body.removeEventListener('mouseleave', onMouseMove);
    };

    // Main
    const onMouseDownResizePanel = () => {
        if (!isDragging.value) isDragging.value = true;
        document.body.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseup', cancelEvents);
    };
    const onMouseUpStopResize = () => {
        cancelEvents();
        document.body.removeEventListener('mouseup', cancelEvents);
    };
    const onResizeUpdateLayout = () => {
        const Target = unref(target);
        const CurrentClientWidth = document.body.clientWidth;
        const TargetLeft = Target.getBoundingClientRect().left;
        leftPanelSize.value = TargetLeft;
        rightPanelSize.value = CurrentClientWidth - TargetLeft;
    };
    const getInitialSize = () => {
        const Rect = unref(wrapper).getBoundingClientRect();
        const ClientTotalWidth = Rect.width;
        const ClientTotalHeight = Rect.height;
        return ResultPanelStore.isHorizontal ? ClientTotalWidth / 2 : ClientTotalHeight / 2;
    };

    onMounted(() => {
        leftPanelSize.value = getInitialSize();
        rightPanelSize.value = getInitialSize();
    });
    watch(
        () => ResultPanelStore.position,
        () => {
            rightPanelSize.value = getInitialSize();
            leftPanelSize.value = getInitialSize();
        }
    );
    return {
        isDragging,
        leftPanelSize,
        rightPanelSize,
        dividerStyle,
        leftPanelStyle,
        rightPanelStyle,
        onMouseDownResizePanel,
        onMouseUpStopResize,
        onResizeUpdateLayout
    };
}
