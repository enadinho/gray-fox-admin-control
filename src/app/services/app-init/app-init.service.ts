import { Injectable } from '@angular/core';
import { AutoLogoutService } from '../auto-logout/auto-logout.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private autoLogOut:AutoLogoutService) { }

  Init(){
      return new Promise<void>((resolve, reject) => {
        // console.log("AppInitService.init() called");
        sessionStorage.setItem('lastAction', Date.now().toString());
        localStorage.removeItem('user');
        resolve();
        // console.log('AppInitService Finished');
      });
  }
}
