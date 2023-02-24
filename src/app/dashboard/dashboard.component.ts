import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
    username: String = '';
    leaderboard: Array<any> = [];
    recipes: Array<any> = [];

    leaderboardActive: Boolean = true;
    recipesActive: Boolean = false;
    recipesAllActive: Boolean = false;
    recipesOnlyUserActive: Boolean = false;
    teamActive: Boolean = false

    constructor(private router:Router,
        private authService:AuthService,
        private http:HttpClient) {}
    
    ngOnInit() {
        this.authService.authenticate().subscribe((response: any) => {
            if(response['error']) {
                this.router.navigateByUrl('/');
            }
            this.username = response.body.username;
            console.log(response);
        });

        this.showLeaderboard();
    }

    showLeaderboard() {
        this.recipesActive = false;
        this.teamActive = false;
        this.leaderboardActive = true;

        this.http.get<any>('/api/leaderboard').subscribe((response: any) => {
            if(response['success']) {
                this.leaderboard = response.body.leaderboard;
                console.log(this.leaderboard);
            }
        });
    }

    showRecipes() {
        this.recipesActive = true;
        this.teamActive = false;
        this.leaderboardActive = false;

        this.recipesAllActive = false;
        this.recipesOnlyUserActive = true;

        this.http.get<any>('/api/recipes').subscribe((response: any) => {
            if(response['success']) {
                this.recipes = response.body.recipes;
                console.log(this.recipes);
            }
        });
    }

    showTeam() {
        this.recipesActive = false;
        this.teamActive = true;
        this.leaderboardActive = false;
    }
}
