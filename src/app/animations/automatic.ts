import { transition, trigger, style, animate } from '@angular/animations';

export class AutomaticAnimation {
    public static SLIDE_POP_ANIMATION_DURATION_IS_MS = 300;
    public static SLIDE_FROM_RIGHT_ANIMATION_DURATION_IS_MS = 300;
    public static SLIDE_FROM_LEFT_ANIMATION_DURATION_IS_MS = 300;
    public static SLIDE_IN_OUT_ANIMATION_DURATION_IS_MS = 300;

    public static get fade() {
        return trigger('fade', [
            transition(
                ':enter',
                [
                    style({
                        opacity: '0',
                    }),
                    animate(
                        `${AutomaticAnimation.SLIDE_POP_ANIMATION_DURATION_IS_MS}ms {{delay}}ms ease-in-out`,
                        style({
                            opacity: '1',
                        }),
                    ),
                ],
                {
                    params: {
                        delay: 0,
                    },
                },
            ),
            transition(':leave', [
                style({
                    opacity: '1',
                }),
                animate(
                    `${AutomaticAnimation.SLIDE_POP_ANIMATION_DURATION_IS_MS}ms ease-in-out`,
                    style({
                        opacity: '0',
                    }),
                ),
            ]),
        ]);
    }

    public static get pop() {
        return trigger('pop', [
            transition(
                ':enter',
                [
                    style({
                        transform: 'scale(0)',
                        opacity: '0',
                    }),
                    animate(
                        `${AutomaticAnimation.SLIDE_POP_ANIMATION_DURATION_IS_MS}ms {{delay}}ms ease-in-out`,
                        style({
                            transform: 'scale(1)',
                            opacity: '1',
                        }),
                    ),
                ],
                {
                    params: {
                        delay: 0,
                    },
                },
            ),
            transition(':leave', [
                style({
                    transform: 'scale(1)',
                    opacity: '1',
                }),
                animate(
                    `${AutomaticAnimation.SLIDE_POP_ANIMATION_DURATION_IS_MS}ms ease-in-out`,
                    style({
                        transform: 'scale(0)',
                        opacity: '0',
                    }),
                ),
            ]),
        ]);
    }

    public static get slideFromRight() {
        return trigger('slideFromRight', [
            transition(
                ':enter',
                [
                    style({
                        transform: 'translateX(100vw)',
                    }),
                    animate(
                        `${AutomaticAnimation.SLIDE_FROM_RIGHT_ANIMATION_DURATION_IS_MS}ms {{delay}}ms ease-in-out`,
                        style({
                            transform: 'translateX(0)',
                        }),
                    ),
                ],
                {
                    params: {
                        delay: 0,
                    },
                },
            ),
        ]);
    }

    public static get slideFromLeft() {
        return trigger('slideFromLeft', [
            transition(
                ':enter',
                [
                    style({
                        transform: 'translateX(-100vw)',
                    }),
                    animate(
                        '{{duration}}ms {{delay}}ms ease-in-out',
                        style({
                            transform: 'translateX(0)',
                        }),
                    ),
                ],
                {
                    params: {
                        duration: AutomaticAnimation.SLIDE_FROM_LEFT_ANIMATION_DURATION_IS_MS,
                        delay: 0,
                    },
                },
            ),
        ]);
    }

    public static get slideInOut() {
        return trigger('slideInOut', [
            transition(':enter', [
                style({
                    transform: 'translateX(100vw)',
                }),
                animate(
                    `${AutomaticAnimation.SLIDE_IN_OUT_ANIMATION_DURATION_IS_MS}ms ease-in`,
                    style({
                        transform: 'translateX(0)',
                    }),
                ),
            ]),
            transition(':leave', [
                style({
                    transform: 'translateX(0)',
                }),
                animate(
                    `${AutomaticAnimation.SLIDE_IN_OUT_ANIMATION_DURATION_IS_MS}ms ease-out`,
                    style({
                        transform: 'translateX(100vw)',
                    }),
                ),
            ]),
        ]);
    }
}
