import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
    username: String = '';

    constructor(private router:Router,
        private authService:AuthService,
        private renderer: Renderer2) {}
    
    ngOnInit() {
        this.authService.authenticate().subscribe((response: any) => {
            if(response['error']) {
                this.router.navigateByUrl('/');
            }
            this.username = response.body.username;
            console.log(response);
        });
    }
}
