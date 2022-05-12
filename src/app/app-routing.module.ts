import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitiateComponent } from './page/initiate/initiate.component';
import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'initiate-suggestion',
    pathMatch: 'full'
  },
  {
    path: 'initiate-suggestion',
    component: InitiateComponent
  },
  {
    path: 'admin',
    component: LoginComponent
  },
  {
    path: 'admin-dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
