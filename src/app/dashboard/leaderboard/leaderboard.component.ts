import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.sass']
})
export class LeaderboardComponent {
  leaderboard: Array<any> = [];

  constructor(private http:HttpClient) {}

  ngOnInit() {

    this.http.get<any>('/api/leaderboard').subscribe((response: any) => {
        if(response['success']) {
            this.leaderboard = response.body.leaderboard;
            console.log(this.leaderboard);
        }
    });
}
}
