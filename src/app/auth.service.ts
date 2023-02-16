import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email:string, password:string) {
    return this.http.post<User>('/api/login', {email, password}).pipe(
      shareReplay()
    );
  }
}
