import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
    username: string = '';

    constructor(
        private router:Router,
        private authService:AuthService) {}
    
    ngOnInit() {
        this.authService.authenticate().subscribe((response: any) => {
            if(response['error']) {
                this.router.navigateByUrl('/');
            }
            this.username = response.body.username;
            this.authService.setUsername(this.username);
            console.log(response);
        });

        this.router.navigateByUrl('/dashboard/leaderboard');
    }

    isRouteLeaderboard() {
        return this.router.url === '/dashboard/leaderboard';
    }

    isRouteRecipes() {
        return this.router.url === '/dashboard/recipes';
    }

    isRouteTeam() {
        return this.router.url === '/dashboard/team';
    }
}
