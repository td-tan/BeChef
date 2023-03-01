import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.sass']
})
export class RecipesComponent {
    recipes: Array<any> = [];
    recipeContents: Array<any> = [];

    recipesAllActive: Boolean = false;
    recipesOnlyUserActive: Boolean = true;

    viewContent: Boolean = false;

    

    constructor(private http:HttpClient) {}

    ngOnInit() {
        this.showMyRecipes();
    }


    showMyRecipes() {
        this.recipesAllActive = false;
        this.recipesOnlyUserActive = true;

        this.http.get<any>('/api/recipes').subscribe((response: any) => {
            if(response['success']) {
                this.recipes = response.body.recipes;
                console.log(this.recipes);
            } else {
                this.recipes = [];
            }
        });
    }

    showAllRecipes() {
        this.recipesAllActive = true;
        this.recipesOnlyUserActive = false;

        this.http.get<any>('/api/recipes', { 
            params: 
            {
                all: true
            }
        }).subscribe((response: any) => {
            if(response['success']) {
                this.recipes = response.body.recipes;
                console.log(this.recipes);
            } else {
                this.recipes = [];
            }
        });
    }

    openRecipe(recipe_id: String) {
        this.viewContent = false;
        console.log(recipe_id);

        this.http.get<any>(`/api/recipe/${recipe_id}`).subscribe((response: any) => {
            if(response['success']) {
                this.recipeContents = response.body.recipeContents;
                console.log(this.recipeContents);
            } else {
                this.recipeContents = [];
            }
        });
    }

    back() {
        this.viewContent = true;
        if(this.recipesAllActive) {
            this.showAllRecipes();
        } else {
            this.showMyRecipes();
        }
    }
}
