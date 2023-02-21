import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
  constructor(private router:Router,
              private authService:AuthService) {

  }
  ngOnInit() {
    this.authService.authenticate().subscribe((response: any) => {
      if(response['error']) {
        this.router.navigateByUrl('/');
      }
      console.log(response);
    });
  }
}
