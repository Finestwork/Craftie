import anime from 'animejs';

export const useTabTransition = () => {
    const onBeforeEnter = (el) => {
        Object.assign(el.style, {
            width: 0
        });
        Object.assign(el.firstElementChild.style, {
            transform: 'translateY(26px)'
        });
    };
    const onEnter = (el, done) => {
        const FirstElementChild = el.firstElementChild;
        const Timeline = anime.timeline({
            easing: 'easeOutCubic',
            duration: 350,
            complete: () => {
                el.style = null;
                FirstElementChild.style = null;
                done();
            }
        });

        Timeline.add({
            targets: el,
            width: 150
        });

        Timeline.add({
            targets: FirstElementChild,
            translateY: 0
        });
    };

    const onLeave = (el, done) => {
        const FirstElementChild = el.firstElementChild;
        const Timeline = anime.timeline({
            easing: 'easeOutCubic',
            complete: () => {
                done();
            }
        });

        Timeline.add({
            targets: FirstElementChild,
            scale: 0,
            duration: 150
        });

        Timeline.add({
            targets: el,
            width: 0,
            duration: 350
        });
    };

    return {
        onBeforeEnter,
        onEnter,
        onLeave
    };
};
