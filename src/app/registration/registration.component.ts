import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent {
  form:FormGroup;

  constructor(private fb:FormBuilder, 
    private authService:AuthService, 
    private router:Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required]
    });
  }

  register() {
    const val = this.form.value;

    if (val.username && val.email && val.password && val.passwordRepeat) {
      this.authService.register(val.username, val.email, val.password, val.passwordRepeat)
        .subscribe(() => {
          console.log("User is registered");
          this.router.navigateByUrl('/Dashboard');
        });
    }
  }
}
