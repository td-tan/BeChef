import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'BeChef';

  constructor(private router:Router,
              private authService:AuthService) {}

  logout() {
    this.authService.logout().subscribe((response: any) => {
        if(response['success']) this.router.navigateByUrl('/');
    });
  }

  isHomeRoute() : Boolean {
    return this.router.url === '/';
  }

  isLoginRoute() : Boolean {
    return this.router.url === '/login';
  }

  isRegisterRoute() : Boolean {
    return this.router.url === '/register';
  }

  isDashboardRoute() : Boolean {
    return (this.router.url === '/dashboard' || 
        this.router.url === '/dashboard/leaderboard' || 
        this.router.url.includes('/dashboard/recipes') || // For dynamic recipe res
        this.router.url === '/dashboard/team');
  }

  isProfileRoute() : Boolean {
    return this.router.url === '/profile';
  }
}
