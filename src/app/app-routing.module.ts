import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CastComponent } from './cast/cast/cast.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { InActiveCastComponent } from './in-active-cast/in-active-cast.component';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, children:[
    {path:'employee', component: EmployeeComponent},
    {path:'cast', component: CastComponent},
    {path:'inActiveCast', component: InActiveCastComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
