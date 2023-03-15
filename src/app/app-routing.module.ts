import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {path:'',component:LoginAuthComponent},
  {path:'home',component:HomeComponent, canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'candiadte',component:CandidatesComponent, canActivate:[AuthGuard]},
  {path:'addcandidate', component:AddCandidateComponent, canActivate:[AuthGuard]},
  {path:'details',component:CandidateDetailsComponent, canActivate:[AuthGuard]},
  {path:'details/candDetails',component:DetailsComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
