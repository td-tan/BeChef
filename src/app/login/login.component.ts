import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  error:Boolean = false;
  error_msg: String = '';
  form:FormGroup;

  constructor(private fb:FormBuilder, 
    private authService:AuthService, 
    private router:Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: ['']
    });
  }

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe((response: any) => {
          if (response['error']) {
            this.error = true;
            this.error_msg = response['error'];
          } else {
            this.router.navigateByUrl('/Dashboard');
          }
        });
    }
  }
}
