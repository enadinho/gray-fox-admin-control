import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { AppInitService } from './services/app-init/app-init.service';
import { AutoLogoutService } from './services/auto-logout/auto-logout.service';
import { RequestCastCardComponent } from './cast/request-cast-card/request-cast-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PopoverModule } from 'ngx-smart-popover';
import { FilterComponent } from './app-common/filter/filter.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }  from '@angular/material/input'
import { SearchFieldModule } from 'ngx-mat-search-field';

export function initializeApp(appInitService: AppInitService) {
  return (): Promise<any> => {
     return appInitService.Init();
  }
}

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
    RequestCastCardComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    PopoverModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    SearchFieldModule
  ],
  providers: [
    NotificationService,
    AppInitService,
    AutoLogoutService,
    { provide: APP_INITIALIZER,useFactory: initializeApp, deps: [AppInitService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
