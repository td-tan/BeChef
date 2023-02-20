import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email:string, password:string) {
    return this.http.post<any>('/api/login', {email, password}).pipe(
      shareReplay()
    );
  }

  register(username:string, email:string, password:string) {
    return this.http.post<any>('/api/register', {username, email, password}).pipe(
      shareReplay()
    );
  }
}
