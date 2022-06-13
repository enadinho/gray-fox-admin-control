import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectorService } from 'src/app/app-common/connector.service';
import { JwtHelperService } from '../jwt/jwthelper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static authAPI = '/api/employee/login';

  constructor(public api: ConnectorService) { }

  public login(form: any ,onError?: any,errorLabel?: string): Observable<any> {
    return this.api.post(
      AuthService.authAPI,
      form,
      onError,
      errorLabel
    );
  }

  isLoggedIn(){
    let jwtHelper = new JwtHelperService(); 
    let tocken = localStorage.getItem('tocken');

    if(!tocken)
        return false;

    let expirationDate = jwtHelper.getTokenExpirationDate(tocken);
    let isExpired = jwtHelper.isTokenExpired(tocken);

    console.log("Expiration", expirationDate);
    console.log("is Expired", isExpired);

    return !isExpired;
}
}
