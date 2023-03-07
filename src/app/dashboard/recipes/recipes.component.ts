import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

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
    
    navigationSub;
    constructor(private http:HttpClient,
                private router:Router) {

        this.navigationSub = this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                if (this.router.url === '/dashboard/recipes')
                {
                    this.viewContent = false;
                }
            }
        });
    }

    ngOnInit() {
        this.showMyRecipes();
    }

    ngOnDestroy() {
        if(this.navigationSub) {
            this.navigationSub.unsubscribe();
        }
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

    addRecipe() {
        
    }

    removeRecipe(event: Event, recipe_id: String) {
        event.stopPropagation();
        console.log(recipe_id);
    }
}
