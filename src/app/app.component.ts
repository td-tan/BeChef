import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'BeChef';

  constructor(private router:Router) {}

  isLoginRoute() : Boolean {
    return this.router.url === '/login';
  }

  isRegisterRoute() : Boolean {
    return this.router.url === '/register';
  }
}
