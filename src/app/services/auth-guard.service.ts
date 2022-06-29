import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  isUserLoggedIn=false;
  routeURL:string;

  constructor(private authService: AuthService, private router: Router) {
    this.routeURL=this.router.url;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    this.isUserLoggedIn=this.authService.isLoggedIn();
    // console.log(state.url);
      if (!this.isUserLoggedIn && this.routeURL !== '/login') {
        // assign '/login' in 'routeURL' to
        // avoid get into infinite loop
        this.routeURL = '/login';
        // when the user is not logged in,
        // instead of just returning false
        // inject router and redirect to '/login' or any other view
        this.router.navigate(['/login'], {
          // note: this queryParams returns the current URL
          // that we can have in 'return' parameter,
          // so when the '/login' page opens,
          // this param tell us from where it comes
          queryParams: {
            return: state.url
          }
        });
        return false;
      } else {
        // re-assign current route URL to 'routeURL'
        // when the user is logged in
        this.routeURL = this.router.url;
        // just return true - if user is logged in
        return true;
      }

}

}
