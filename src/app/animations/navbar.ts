import { transition, trigger, state, style, animate } from '@angular/animations';

export class LoggedNavbarAnimation {
	public static LOGGED_SWIPE_ANIMATION_DURATION_IS_MS = 200;

	public static get swipeAnimation() {
		const isMobile = matchMedia('(max-width: 811px)').matches;

		return isMobile
			? LoggedNavbarAnimation._mobileSwipeAnimation
			: LoggedNavbarAnimation._desktopSwipeAnimation;
	}

	private static _mobileSwipeAnimation = trigger('loggedSwipe', [
		state(
			'left',
			style({
				width: '100vw',
				marginLeft: '-100vw',
			}),
		),
		state(
			'right',
			style({
				width: 'calc(100vw - 8vh)',
			}),
		),
		transition('left => right', [
			animate(`${LoggedNavbarAnimation.LOGGED_SWIPE_ANIMATION_DURATION_IS_MS}ms`),
		]),
		transition('right => left', [
			animate(`${LoggedNavbarAnimation.LOGGED_SWIPE_ANIMATION_DURATION_IS_MS}ms`),
		]),
	]);

	private static _desktopSwipeAnimation = trigger('loggedSwipe', [
		state(
			'left',
			style({
				width: '30vh',
				marginLeft: '-30vh',
			}),
		),
		state(
			'right',
			style({
				width: '30vh',
			}),
		),
		transition('left => right', [
			animate(`${LoggedNavbarAnimation.LOGGED_SWIPE_ANIMATION_DURATION_IS_MS}ms`),
		]),
		transition('right => left', [
			animate(`${LoggedNavbarAnimation.LOGGED_SWIPE_ANIMATION_DURATION_IS_MS}ms`),
		]),
	]);
}

export class LoginNavbarAnimation {
	public static LOGIN_SWIPE_ANIMATION_DURATION_IS_MS = 300;
	public static LOGIN_SWIPE_ANIMATION_DELAY_IS_MS = 1000;

	public static get swipeAnimation() {
		const isMobile = matchMedia('(max-width: 801px)').matches;

		return isMobile
			? LoginNavbarAnimation._mobileSwipeAnimation
			: LoginNavbarAnimation._desktopSwipeAnimation;
	}

	private static _mobileSwipeAnimation = trigger('loginSwipe', [
		state(
			'right',
			style({
				width: '100vw',
			}),
		),
		state(
			'left',
			style({
				width: '100vw',
				marginLeft: '-100vw',
			}),
		),
		transition('right => left', [
			animate(
				`${LoginNavbarAnimation.LOGIN_SWIPE_ANIMATION_DURATION_IS_MS}ms ${this.LOGIN_SWIPE_ANIMATION_DELAY_IS_MS}ms`,
			),
		]),
		transition('left => right', [
			animate(
				`${LoginNavbarAnimation.LOGIN_SWIPE_ANIMATION_DURATION_IS_MS}ms ${this.LOGIN_SWIPE_ANIMATION_DELAY_IS_MS}ms`,
			),
		]),
	]);

	private static _desktopSwipeAnimation = trigger('loginSwipe', [
		state(
			'right',
			style({
				width: '100vw',
				marginLeft: '0',
			}),
		),
		state(
			'left',
			style({
				width: '30vh',
				marginLeft: '-30vh',
			}),
		),
		transition('right => left', [
			animate(
				`${LoginNavbarAnimation.LOGIN_SWIPE_ANIMATION_DURATION_IS_MS}ms ${this.LOGIN_SWIPE_ANIMATION_DELAY_IS_MS}ms`,
			),
		]),
		transition('left => right', [
			animate(
				`${LoginNavbarAnimation.LOGIN_SWIPE_ANIMATION_DURATION_IS_MS}ms ${this.LOGIN_SWIPE_ANIMATION_DELAY_IS_MS}ms`,
			),
		]),
	]);
}
