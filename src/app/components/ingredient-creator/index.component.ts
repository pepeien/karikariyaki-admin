import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { v4 } from 'uuid';
import { Ingredient, IngredientType } from 'karikarihelper';

// Animations
import { AutomaticAnimation } from '@animations';

// Service
import { LanguageService } from '@services';
import { MatRadioChange } from '@angular/material/radio';

interface IngredientItem {
	id: string;
	data: Ingredient;
}

@Component({
	selector: 'app-ingredient-creator',
	templateUrl: './index.component.html',
	animations: [AutomaticAnimation.pop],
})
export class IngredientCreatorComponent implements OnInit {
	@Input()
	public ingredientTypes: IngredientType[] = Object.values(IngredientType);
	@Input()
	public ingredients: Ingredient[] = [];

	@Output()
	public onCreation = new EventEmitter<Ingredient[]>();

	/**
	 * Data
	 */
	public ingredientItems: IngredientItem[] = [];
	public selectedIngredientType = this.ingredientTypes[0];

	/**
	 * Forms
	 */
	public formGroup = new FormGroup({
		ingredientName: new FormControl('', []),
	});

	/**
	 * Language
	 */
	public languageSource = LanguageService.DEFAULT_LANGUAGE;

	constructor(private _languageService: LanguageService) {}

	ngOnInit(): void {
		if (this.ingredients) {
			this.ingredientItems = this._convertToItem(this.ingredients);
		}

		this._languageService.language.subscribe({
			next: (nextLanguage) => {
				this.languageSource = nextLanguage;
			},
		});
	}

	public isIgredientInvalid() {
		return false;
	}

	public onIngredientTypeSelection(event: MatRadioChange) {
		this.selectedIngredientType = event.value as IngredientType;
	}

	public onIngredientAddition() {
		if (!this.formGroup.controls.ingredientName.value) {
			return;
		}

		this.ingredientItems.unshift({
			id: v4(),
			data: {
				name: this.formGroup.controls.ingredientName.value,
				type: this.selectedIngredientType,
			},
		});

		this.onCreation.emit(this.ingredientItems.map((ingredient) => ingredient.data));

		this.formGroup.reset();
	}

	public onIngredientRemove(id: string) {
		this.ingredientItems = this.ingredientItems.filter((ingredient) => ingredient.id !== id);

		this.onCreation.emit(this.ingredientItems.map((ingredient) => ingredient.data));
	}

	private _convertToItem(target: Ingredient[]): IngredientItem[] {
		const result: IngredientItem[] = [];

		target.forEach((ingredient) => {
			result.unshift({
				id: v4(),
				data: {
					name: ingredient.name,
					type: ingredient.type,
				},
			});
		});

		return result;
	}
}
