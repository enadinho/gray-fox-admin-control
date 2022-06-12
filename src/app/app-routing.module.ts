import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CastComponent } from './cast/cast/cast.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { HomeComponent } from './home/home.component';
import { InActiveCastComponent } from './in-active-cast/in-active-cast.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path:'', component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent,
    canActivate: [AuthGuardService], 
    children:[
      {path:'home', component: HomeComponent},
      {path:'employee', component: EmployeeComponent},
      {path:'cast', component: CastComponent},
      {path:'inActiveCast', component: InActiveCastComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
