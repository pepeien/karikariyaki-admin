import { transition, trigger, state, style, animate } from '@angular/animations';

export class BasicAnimations {
    public static BREATHING_ANIMATION_DURATION_IN_MS = 1000;

    public static FADE_ANIMATION_DURATION_IN_MS = 200;

    public static SHRINK_ANIMATION_DURATION_IN_MS = 1000;
    public static VERTICAL_SHRINK_ANIMATION_DURATION_IN_MS = 200;

    public static ROTATE_ANIMATION_DURATION_IN_MS = 200;

    public static ZOOM_ANIMATION_DURATION_IN_MS = 400;
    public static ZOOM_ANIMATION_DELAY_IN_MS = BasicAnimations.ZOOM_ANIMATION_DURATION_IN_MS * 1.5;

    public static get breatheAnimation() {
        return trigger('breathe', [
            state(
                'inhale',
                style({
                    scale: 1,
                }),
            ),
            state(
                'exhale',
                style({
                    scale: 1.35,
                }),
            ),
            transition('inhale => exhale', [
                animate(`${BasicAnimations.BREATHING_ANIMATION_DURATION_IN_MS}ms ease`),
            ]),
            transition('exhale => inhale', [
                animate(`${BasicAnimations.BREATHING_ANIMATION_DURATION_IN_MS}ms ease`),
            ]),
        ]);
    }

    public static get bezierShrinkAnimation() {
        return trigger('bezierShrink', [
            state(
                'min',
                style({
                    scale: 0,
                    opacity: 0,
                }),
            ),
            state(
                'max',
                style({
                    scale: 1,
                    opacity: 1,
                }),
            ),
            transition('min => max', [
                animate(
                    `${BasicAnimations.SHRINK_ANIMATION_DURATION_IN_MS}ms cubic-bezier(0,.05,1,-0.62)`,
                ),
            ]),
            transition('max => min', [
                animate(
                    `${BasicAnimations.SHRINK_ANIMATION_DURATION_IN_MS}ms cubic-bezier(0,.05,1,-0.62)`,
                ),
            ]),
        ]);
    }

    public static get bezierShrinkHeightAnimation() {
        return trigger('bezierHeightShrink', [
            state(
                'min',
                style({
                    scale: 0,
                    opacity: 0,
                    height: 0,
                }),
            ),
            state(
                'max',
                style({
                    scale: 1,
                    opacity: 1,
                }),
            ),
            transition('min => max', [
                animate(
                    `${BasicAnimations.SHRINK_ANIMATION_DURATION_IN_MS}ms cubic-bezier(0,.05,1,-0.62)`,
                ),
            ]),
            transition('max => min', [
                animate(
                    `${BasicAnimations.SHRINK_ANIMATION_DURATION_IN_MS}ms cubic-bezier(0,.05,1,-0.62)`,
                ),
            ]),
        ]);
    }

    public static get fadeAnimation() {
        return trigger('fade', [
            state(
                'min',
                style({
                    opacity: 0,
                }),
            ),
            state(
                'max',
                style({
                    opacity: 1,
                }),
            ),
            transition('min => max', [
                animate(`${BasicAnimations.FADE_ANIMATION_DURATION_IN_MS}ms`),
            ]),
            transition('max => min', [
                animate(`${BasicAnimations.FADE_ANIMATION_DURATION_IN_MS}ms`),
            ]),
        ]);
    }

    public static get shrinkAnimation() {
        return trigger('shrink', [
            state(
                'min',
                style({
                    scale: 0,
                    opacity: 0,
                }),
            ),
            state(
                'max',
                style({
                    scale: 1,
                    opacity: 1,
                }),
            ),
            transition('min => max', [
                animate(`${BasicAnimations.SHRINK_ANIMATION_DURATION_IN_MS}ms`),
            ]),
            transition('max => min', [
                animate(`${BasicAnimations.SHRINK_ANIMATION_DURATION_IN_MS}ms`),
            ]),
        ]);
    }

    public static get horizontalShrinkAnimation() {
        return trigger('horizontalShrink', [
            state(
                'min',
                style({
                    width: 0,
                }),
            ),
            state('max', style({})),
            transition('min => max', [
                animate(`${BasicAnimations.VERTICAL_SHRINK_ANIMATION_DURATION_IN_MS}ms`),
            ]),
            transition('max => min', [
                animate(`${BasicAnimations.VERTICAL_SHRINK_ANIMATION_DURATION_IN_MS}ms`),
            ]),
        ]);
    }

    public static get verticalShrinkAnimation() {
        return trigger('verticalShrink', [
            state(
                'min',
                style({
                    height: 0,
                }),
            ),
            state('max', style({})),
            transition('min => max', [
                animate(`${BasicAnimations.VERTICAL_SHRINK_ANIMATION_DURATION_IN_MS}ms`),
            ]),
            transition('max => min', [
                animate(`${BasicAnimations.VERTICAL_SHRINK_ANIMATION_DURATION_IN_MS}ms`),
            ]),
        ]);
    }

    public static get zoomAnimation() {
        return trigger('zoom', [
            state(
                'open',
                style({
                    scale: 0,
                    opacity: 0,
                }),
            ),
            state(
                'closed',
                style({
                    scale: 1,
                    opacity: 1,
                }),
            ),
            transition('open => closed', [
                animate(`${BasicAnimations.ZOOM_ANIMATION_DURATION_IN_MS}ms ease-in-out`),
            ]),
            transition('closed => open', [
                animate(`${BasicAnimations.ZOOM_ANIMATION_DURATION_IN_MS}ms ease-in-out`),
            ]),
        ]);
    }

    public static get rotateCounterClock180Animation() {
        return trigger('rotateCounterClock180', [
            state(
                'start',
                style({
                    transform: 'rotate(0deg)',
                }),
            ),
            state(
                'end',
                style({
                    transform: 'rotate(-180deg)',
                }),
            ),
            transition('start => end', [
                animate(`${BasicAnimations.ROTATE_ANIMATION_DURATION_IN_MS}ms ease-in-out`),
            ]),
            transition('end => start', [
                animate(`${BasicAnimations.ROTATE_ANIMATION_DURATION_IN_MS}ms ease-in-out`),
            ]),
        ]);
    }
}
