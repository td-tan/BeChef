import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaderboardComponent } from './dashboard/leaderboard/leaderboard.component';
import { RecipesComponent } from './dashboard/recipes/recipes.component';
import { TeamComponent } from './dashboard/team/team.component';
import { RecipeContentComponent } from './dashboard/recipes/recipe-content/recipe-content.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: 'leaderboard', component: LeaderboardComponent },
      { 
        path: 'recipes', 
        component: RecipesComponent,
        children: [
          { path: ':id', component: RecipeContentComponent }
        ],
        runGuardsAndResolvers: 'always'
      },
      { path: 'team', component: TeamComponent },
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    LeaderboardComponent,
    RecipesComponent,
    TeamComponent,
    RecipeContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
