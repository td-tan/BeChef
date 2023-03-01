import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.sass']
})
export class RecipesComponent {
    recipes: Array<any> = [];

    recipesAllActive: Boolean = false;
    recipesOnlyUserActive: Boolean = true;

    viewContent: Boolean = false;
    

    constructor(private http:HttpClient,
                private router:Router) {}

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
        this.viewContent = true;
        this.router.navigateByUrl(`/dashboard/recipes/${recipe_id}`);
    }
}
