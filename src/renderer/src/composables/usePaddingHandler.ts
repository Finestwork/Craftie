import { onMounted, onUnmounted, nextTick, unref, Ref } from 'vue';
import { useElementBounding } from '@vueuse/core';

// Adds padding-top to the target using source element's height
export function useAddPaddingTop(target: Ref<HTMLElement>, source: Ref<HTMLElement>) {
  const addPadding = () => {
    const { height } = useElementBounding(unref(source));
    const MainWrapper = <HTMLDivElement>unref(target);
    const Height = height.value;
    Object.assign(MainWrapper.style, {
      paddingTop: `${Height}px`
    });
  };

  onMounted(async () => {
    await nextTick();
    addPadding();
    window.addEventListener('resize', addPadding);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', addPadding);
  });
}
