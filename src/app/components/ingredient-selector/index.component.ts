import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { v4 } from 'uuid';
import { Ingredient, IngredientType } from 'karikarihelper';

// Animations
import { AutomaticAnimation } from '@animations';

// Service
import { LanguageService } from '@services';

interface IngredientItem {
    id: string;
    data: Ingredient;
}

@Component({
    selector: 'app-ingredient-selector',
    templateUrl: './index.component.html',
    animations: [AutomaticAnimation.pop],
})
export class IngredientSelectorComponent implements OnInit, OnChanges {
    @Input()
    public ingredients: Ingredient[] = [];

    @Output()
    public onOptionalSelection = new EventEmitter<Ingredient[]>();
    @Output()
    public onAdditionalSelection = new EventEmitter<Ingredient[]>();

    /**
     * Data
     */
    public additionalIngredientItems: IngredientItem[] = [];
    public optionalIngredientItems: IngredientItem[] = [];
    public selectedAdditionalIngredientItems: IngredientItem[] = [];
    public selectedOptionalIngredientItems: IngredientItem[] = [];

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
            const convertedIngredients = this._convertToItem(this.ingredients);

            this.additionalIngredientItems = convertedIngredients.filter(
                (ingredient) => ingredient.data.type === IngredientType.ADDITIONAL,
            );
            this.optionalIngredientItems = convertedIngredients.filter(
                (ingredient) => ingredient.data.type === IngredientType.OPTIONAL,
            );
        }

        this._languageService.language.subscribe({
            next: (nextLanguage) => {
                this.languageSource = nextLanguage;
            },
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const nextIngredients =
            (changes['ingredients'].currentValue as unknown as Ingredient[]) ?? [];

        const convertedIngredients = this._convertToItem(nextIngredients);

        this.additionalIngredientItems = convertedIngredients.filter(
            (ingredient) => ingredient.data.type === IngredientType.ADDITIONAL,
        );
        this.optionalIngredientItems = convertedIngredients.filter(
            (ingredient) => ingredient.data.type === IngredientType.OPTIONAL,
        );
    }

    public onAdditionalIngredientClick(ingredient: IngredientItem) {
        if (this.isAdditionalIngredientSelected(ingredient)) {
            this.selectedAdditionalIngredientItems = this.selectedAdditionalIngredientItems.filter(
                (entry) => entry.id !== ingredient.id,
            );

            return;
        }

        this.selectedAdditionalIngredientItems.push(ingredient);

        this.onAdditionalSelection.emit(
            this.selectedAdditionalIngredientItems.map((entry) => entry.data),
        );
    }

    public onOptionalIngredientClick(ingredient: IngredientItem) {
        if (this.isOptionalIngredientSelected(ingredient)) {
            this.selectedOptionalIngredientItems = this.selectedOptionalIngredientItems.filter(
                (entry) => entry.id !== ingredient.id,
            );

            return;
        }

        this.selectedOptionalIngredientItems.push(ingredient);

        this.onOptionalSelection.emit(
            this.selectedOptionalIngredientItems.map((entry) => entry.data),
        );
    }

    public isAdditionalIngredientSelected(ingredient: IngredientItem) {
        return (
            this.selectedAdditionalIngredientItems.findIndex(
                (entry) => entry.id === ingredient.id,
            ) !== -1
        );
    }

    public isOptionalIngredientSelected(ingredient: IngredientItem) {
        return (
            this.selectedOptionalIngredientItems.findIndex(
                (entry) => entry.id === ingredient.id,
            ) !== -1
        );
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
