import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnectorService } from 'src/app/app-common/connector.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static authAPI = '/api/employee/login';
  public static profAPI = '/api/employee/profile';


  constructor(public api: ConnectorService,
              private router:Router) { }

  public login(form: any ,onError?: any,errorLabel?: string): Observable<any> {
    return this.api.post(
      AuthService.authAPI,
      form,
      onError,
      errorLabel
    );
  }

  profile():Observable<any>{
    return this.api.get(AuthService.profAPI);
  }

  saveUserToLocalStorage(user:any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //improve this function later if required
  isLoggedIn(){
    let userProfile=localStorage.getItem('user');
    console.log(userProfile);
    if(userProfile!=null){
      let userObject=JSON.parse(userProfile);
      let tokenExpired=this.tokenExpired(userObject.token)
      console.log(tokenExpired)
      return !tokenExpired;
    }
    else
      return false;
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    console.log(expiry)
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

}
