import { Ref, unref, ref } from 'vue';

export function useResizePanel(target: Ref<HTMLElement>) {
  const ClientTotalWidth = document.body.clientWidth;
  const isDragging = ref(false);
  const leftPanelWidth = ref(ClientTotalWidth / 2);
  const rightPanelWidth = ref(ClientTotalWidth / 2);

  // Helpers
  const onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    const Target = unref(target);
    const MouseX = e.clientX;
    const TargetLeft = Target.getBoundingClientRect().left;
    const CurrentClientWidth = document.body.clientWidth;
    leftPanelWidth.value = TargetLeft;
    rightPanelWidth.value = CurrentClientWidth - TargetLeft;
    Object.assign(Target.style, {
      left: `${MouseX}px`
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
    leftPanelWidth.value = TargetLeft;
    rightPanelWidth.value = CurrentClientWidth - TargetLeft;
  };

  return {
    isDragging,
    leftPanelWidth,
    rightPanelWidth,
    onMouseDownResizePanel,
    onMouseUpStopResize,
    onResizeUpdateLayout
  };
}
