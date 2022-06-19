import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigationBar/navigation-bar/navigation-bar.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { CastComponent } from './cast/cast/cast.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { InActiveCastComponent } from './in-active-cast/in-active-cast.component';
import { HomeComponent } from './home/home.component';
import { CastCardComponent } from './app-common/cast-card/cast-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from './app-common/notification.service';

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
    CastCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
