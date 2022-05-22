import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigationBar/navigation-bar/navigation-bar.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { CastComponent } from './cast/cast/cast.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { InActiveCastComponent } from './in-active-cast/in-active-cast.component';
import { HomeComponent } from './home/home.component';
import { CastCardComponent } from './app-common/cast-card/cast-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    EmployeeComponent,
    CastComponent,
    LoginComponent,
    DashboardComponent,
    InActiveCastComponent,
    HomeComponent,
    CastCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
