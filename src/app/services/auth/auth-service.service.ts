import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectorService } from 'src/app/app-common/connector.service';
import { JwtHelperService } from '../jwt/jwthelper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static authAPI = '/api/employee/login';
  public static profAPI = '/api/employee/profile';


  constructor(public api: ConnectorService) { }

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
    localStorage.setItem('user-profile', JSON.stringify(user));
  }

  //improve this function later if required
  isLoggedIn(){
    let userProfile=localStorage.getItem('user-profile');
    if(userProfile!=null)
      return true;
    else
      return false;  
  }

  logout(){
    localStorage.removeItem('user-profile')
  }
}
