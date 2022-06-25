import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {

  CHECK_INTERVAL_MILLIS = 60000 // in ms
  INACTIVITY_TIME_LIMIT_MILLIS=180000 //in ms
  LAST_ACTION_TIMESTAMP:string = "lastAction";

  currentUser=null;
  minimized=false;

  constructor(private authService:AuthService,
              private router:Router) {
    this.checkTimoutEvent();
    this.initListener();
    this.initInterval();
  }

  public getLastAction() {
    const lastActionTimestamp=sessionStorage.getItem(this.LAST_ACTION_TIMESTAMP);
    return lastActionTimestamp!=null ? Number(lastActionTimestamp) : new Date().getTime();
  }

  public setLastAction(lastAction: number) {
    sessionStorage.setItem(this.LAST_ACTION_TIMESTAMP, lastAction.toString());
  }

  public getExpiresAt(){
    this.currentUser=JSON.parse(localStorage.getItem('user') || "");
    let expireAt=new Date().getTime();
    if(this.currentUser)
      expireAt = new Date(this.currentUser['expiresAt']).getTime();
    return expireAt;
  }

  initListener() {
    document.body.addEventListener('mousemove', () => this.resetLastActionTimestamp());
    document.body.addEventListener('mousedown', () => this.resetLastActionTimestamp());
    document.body.addEventListener('DOMMouseScroll', () => this.resetLastActionTimestamp());
    document.body.addEventListener('mousewheel', () => this.resetLastActionTimestamp());
    document.body.addEventListener('touchmove', () => this.resetLastActionTimestamp());
    document.body.addEventListener('click', () => this.resetLastActionTimestamp());
    document.body.addEventListener('click', () => this.resetLastActionTimestamp());
    document.body.addEventListener('mouseover', () => this.resetLastActionTimestamp());
    document.body.addEventListener('mouseout', () => this.resetLastActionTimestamp());
    document.body.addEventListener('keydown', () => this.resetLastActionTimestamp());
    document.body.addEventListener('keyup', () => this.resetLastActionTimestamp());
    document.body.addEventListener('keypress', () => this.resetLastActionTimestamp());
    document.addEventListener("visibilitychange", ()=> this.onTabChanged(document.hidden));
  }

  onTabChanged(hidden: boolean){
    this.minimized=hidden;
  }

  resetLastActionTimestamp() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
      this.checkTimoutEvent();
    }, this.CHECK_INTERVAL_MILLIS);
  }

  checkTimoutEvent() {
    let userProfile=localStorage.getItem('user');
    // console.log(userProfile);
    if(userProfile!=null){

      const now = Date.now();
      const timeleftInactive = this.getLastAction() + Number(this.INACTIVITY_TIME_LIMIT_MILLIS);
      let diff = timeleftInactive - now;
      const isInactivityTimeout = diff < 0;

      const timeForcedLogout = this.getExpiresAt();
      diff = timeForcedLogout - now;

      const isForcedTimout = diff < 0;

      if (isInactivityTimeout) {
        if(!this.minimized)
          this.onInactivityTimeOut();
         else{
          this.logout();
         }
      }

      //console.log(isForcedTimout);
      if(isForcedTimout){
        this.onForcedTimeOut();
      }
    }
  }

  onInactivityTimeOut() {
    this.logout();
  }

  logout(){
    this.authService.logout();
  }


  onForcedTimeOut() {
    this.logout();
  }


}
