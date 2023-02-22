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

    leaderboardActive: Boolean = true;
    recipesActive: Boolean = false;
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

        this.http.get<any>('/api/leaderboard').subscribe((response: any) => {
            if(response['success']) {
                this.leaderboard = response.body.leaderboard;
                console.log(this.leaderboard);
            }
        });
    }
}
