import { unref } from 'vue';
import type { Ref } from 'vue';
import Bounce from 'bounce.js';

export const bounceAnimation = (btn: Ref) => {
  const bounceAnim = new Bounce();
  bounceAnim
    .scale({
      from: { x: 1, y: 1 },
      to: { x: 0.3, y: 0.3 },
      easing: 'bounce',
      duration: 750,
      bounces: 5,
      stiffness: 1
    })
    .scale({
      from: { x: 1, y: 1 },
      to: { x: 3.3, y: 3.3 },
      easing: 'bounce',
      duration: 750,
      bounces: 4,
      stiffness: 1
    })
    .applyTo(unref(btn), { remove: true });
};
