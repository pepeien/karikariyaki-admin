import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnimationEvent } from '@angular/animations';
import { Menu, Operator, StringService } from 'karikarihelper';

// Animations
import { BasicAnimations, LoggedNavbarAnimation, LoginNavbarAnimation } from '@animations';

// Service
import {
	ApiService,
	LanguageService,
	MenuService,
	OperatorService,
	SettingsService,
} from '@services';

// Langs
import { Langs, LangKey } from '@langs';

@Component({
	selector: 'app-navbar',
	templateUrl: './index.component.html',
	animations: [
		BasicAnimations.breatheAnimation,
		BasicAnimations.bezierShrinkAnimation,
		BasicAnimations.bezierShrinkHeightAnimation,
		BasicAnimations.fadeAnimation,
		BasicAnimations.verticalShrinkAnimation,
		BasicAnimations.rotateCounterClock180Animation,
		LoggedNavbarAnimation.swipeAnimation,
		LoginNavbarAnimation.swipeAnimation,
	],
})
export class NavbarComponent implements OnInit {
	/**
	 * Consts
	 */
	public readonly NAVBAR_INPUT_USER_NAME_MIN_LENGTH = 1;
	public readonly NAVBAR_INPUT_USER_NAME_MAX_LENGTH = 25;

	/**
	 * API switches
	 */
	public isLoading = false;

	/**
	 * Animation switches
	 */
	public wasLoginInputDispatched = false;
	public wasLoginNavbarDispatched = false;
	public isLoggedNavbarExtended = false;
	public didLogout = false;

	/**
	 * Animation states
	 */
	public loginAvatarBreatheAnimationState: 'inhale' | 'exhale' = 'inhale';
	public loginAvatarShrinkAnimationState: 'min' | 'max' = 'min';
	public loginInputShrinkAnimationState: 'min' | 'max' = 'min';
	public loginInputErrorShrinkAnimationState: 'min' | 'max' = 'min';
	public loginNavbarSwipeAnimationState: 'right' | 'left' = 'left';
	public loggedNavbarSwipeAnimationState: 'right' | 'left' = 'left';
	public loggedNavbarProfileShrinkAnimationState: 'min' | 'max' = 'min';
	public loggedNavbarProfileLanguageShrinkAnimationState: 'min' | 'max' = 'min';

	/**
	 * Error
	 */
	public errorMessage = '';

	/**
	 * Angular
	 */
	public loginForm = new FormGroup({
		userName: new FormControl('', [
			Validators.required,
			Validators.minLength(this.NAVBAR_INPUT_USER_NAME_MIN_LENGTH),
			Validators.maxLength(this.NAVBAR_INPUT_USER_NAME_MAX_LENGTH),
		]),
	});

	/**
	 * In House
	 */
	public menu: Menu[] = [];
	public operator: Operator | null = null;
	public langList = Langs;
	public languageSource = LanguageService.DEFAULT_LANGUAGE;

	constructor(
		private _apiService: ApiService,
		private _languageService: LanguageService,
		private _menuService: MenuService,
		private _operatorService: OperatorService,
		private _settingsService: SettingsService,
	) {}

	ngOnInit(): void {
		this._languageService.language.subscribe({
			next: (nextLanguage) => {
				this.languageSource = nextLanguage;
			},
		});

		this._menuService.menu.subscribe({
			next: (nextMenu) => {
				this.menu = nextMenu;
			},
			error: (error) => {
				this.menu = [];

				console.log(error);
			},
		});

		this._operatorService.operator.subscribe({
			next: (nextOperator) => {
				this.disableLoading();

				if (!nextOperator) {
					this.operator = null;

					if (this.didLogout) {
						this.onHamburgerClick();

						setTimeout(() => {
							this.retrieveLogin();
						}, LoggedNavbarAnimation.LOGGED_SWIPE_ANIMATION_DURATION_IS_MS + 100);

						this.didLogout = false;

						return;
					}

					this.retrieveLogin();

					return;
				}

				this.dispatchLoginInput();

				setTimeout(() => {
					this.operator = nextOperator;
				}, BasicAnimations.SHRINK_ANIMATION_DURATION_IN_MS);

				setTimeout(() => {
					this.dispatchLoginAvatar();
				}, BasicAnimations.SHRINK_ANIMATION_DURATION_IN_MS * 2);

				setTimeout(() => {
					this.dispatchLogin();
				}, BasicAnimations.SHRINK_ANIMATION_DURATION_IN_MS * 2 + 100);

				this._menuService.update();

				return;
			},
			error: () => {
				this.operator = null;

				this.disableLoading();
				this.retrieveLoginInput();
			},
		});
	}

	public retrieveLoginAvatar() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.loginAvatarShrinkAnimationState = 'max';
	}

	public dispatchLoginAvatar() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.loginAvatarShrinkAnimationState = 'min';
	}

	public dispatchLoginError() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.loginInputErrorShrinkAnimationState = 'min';
	}

	public retrieveLoginInput() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.loginInputShrinkAnimationState = 'max';

		this.loginForm.enable();
	}

	public dispatchLoginInput() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.loginInputShrinkAnimationState = 'min';

		this.dispatchLoginError();

		this.loginForm.disable();
	}

	public enableLoading() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.isLoading = true;
		this.loginAvatarBreatheAnimationState = 'exhale';
	}

	public disableLoading() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.isLoading = false;
		this.loginAvatarBreatheAnimationState = 'inhale';
	}

	public retrieveLogin() {
		if (this.wasLoginNavbarDispatched === false) {
			return;
		}

		this.loginNavbarSwipeAnimationState = 'right';
	}

	public dispatchLogin() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.loginNavbarSwipeAnimationState = 'left';
	}

	public isLanguageActive(languageDisplayName: string) {
		return this.languageSource['LANGUAGE_DISPLAY_NAME'] === languageDisplayName;
	}

	public onProfileClick() {
		if (this.wasLoginNavbarDispatched === false) {
			return;
		}

		this.loggedNavbarProfileShrinkAnimationState =
			this.loggedNavbarProfileShrinkAnimationState === 'min' ? 'max' : 'min';
		this.loggedNavbarProfileLanguageShrinkAnimationState = 'min';
	}

	public onProfileLanguageSettingsClick() {
		if (this.wasLoginNavbarDispatched === false) {
			return;
		}

		this.loggedNavbarProfileLanguageShrinkAnimationState =
			this.loggedNavbarProfileLanguageShrinkAnimationState === 'min' ? 'max' : 'min';
	}

	public onFocus() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.setError('');
	}

	public onHamburgerClick() {
		if (this.wasLoginNavbarDispatched === false) {
			return;
		}

		this.loggedNavbarSwipeAnimationState =
			this.loggedNavbarSwipeAnimationState === 'left' ? 'right' : 'left';
	}

	public onLanguageUpdate(nextLang: string) {
		this._settingsService.update({
			language: nextLang as LangKey,
		});
	}

	public onLoginAvatarBreatheAnimationDone() {
		if (this.wasLoginNavbarDispatched || this.isLoading === false) {
			return;
		}

		this.loginAvatarBreatheAnimationState =
			this.loginAvatarBreatheAnimationState === 'inhale' ? 'exhale' : 'inhale';
	}

	public onLogin() {
		const userNameFormControl = this.loginForm.get('userName');

		if (
			!userNameFormControl ||
			userNameFormControl.invalid ||
			StringService.isStringInsideBoundaries(
				userNameFormControl.value ?? '',
				this.NAVBAR_INPUT_USER_NAME_MIN_LENGTH,
				this.NAVBAR_INPUT_USER_NAME_MAX_LENGTH,
			) === false
		) {
			return;
		}

		const userName = userNameFormControl.value as string;

		this.dispatchLoginInput();

		const loadingAnimation = setTimeout(() => {
			this.enableLoading();
		}, BasicAnimations.SHRINK_ANIMATION_DURATION_IN_MS);

		this._apiService.V1.operatorAdmin.signIn(userName).subscribe({
			next: (response) => {
				if (response.wasSuccessful === false || !response.result) {
					return;
				}

				clearTimeout(loadingAnimation);

				this._operatorService.signIn(response.result);
			},
			error: (error) => {
				this.setError(error.error.description ?? 'Failed to sign in');

				clearTimeout(loadingAnimation);

				this.disableLoading();

				this.retrieveLoginInput();
			},
		});
	}

	public onLoggedNavbarSwipeAnimationDone(event: AnimationEvent) {
		const rasterizedEventToState = event.toState.trim().toLocaleLowerCase();

		if (rasterizedEventToState === 'invalid') {
			return;
		}

		this.isLoggedNavbarExtended = rasterizedEventToState === 'left';
	}

	public onLoginNavbarSwipeAnimationDone(event: AnimationEvent) {
		const rasterizedEventToState = event.toState.trim().toLocaleLowerCase();

		if (rasterizedEventToState === 'invalid') {
			return;
		}

		this.wasLoginNavbarDispatched = rasterizedEventToState === 'left';

		if (rasterizedEventToState === 'right') {
			setTimeout(() => {
				this.retrieveLoginAvatar();
				this.retrieveLoginInput();
			}, 100);
		}
	}

	public onLoginInputShrinkAnimationDone(event: AnimationEvent) {
		if (event.toState.trim().toLocaleLowerCase() !== 'min') {
			return;
		}

		this.wasLoginInputDispatched = true;
	}

	public onLogout() {
		this.didLogout = true;

		this._operatorService.signOut();
	}

	public setError(nextErrorMessage: string) {
		if (nextErrorMessage.trim().length === 0) {
			setTimeout(() => {
				this.errorMessage = '';
			}, BasicAnimations.SHRINK_ANIMATION_DURATION_IN_MS);

			this.loginInputErrorShrinkAnimationState = 'min';

			return;
		}

		this.errorMessage = nextErrorMessage;

		this.loginInputErrorShrinkAnimationState = 'max';
	}
}
