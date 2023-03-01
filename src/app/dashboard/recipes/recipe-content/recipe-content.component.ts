import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-content',
  templateUrl: './recipe-content.component.html',
  styleUrls: ['./recipe-content.component.sass']
})
export class RecipeContentComponent {
    recipeContents: Array<any> = [];

    constructor(private http:HttpClient,
                private router:Router,
                private route: ActivatedRoute) {}
    
    ngOnInit() {
        const routeParams = this.route.snapshot.paramMap;
        const recipe_id = routeParams.get('id');
        if (recipe_id) {
            this.getRecipeContent(recipe_id);
        }
    }

    getRecipeContent(recipe_id: String) {
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
        this.router.navigateByUrl('/dashboard/recipes');
    }
}
