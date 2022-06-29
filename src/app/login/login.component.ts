import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { NotificationService } from '../app-common/notification.service';
import { AuthService } from '../services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  f: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private authService:AuthService,
              private notificationService:NotificationService) {

    this.f = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,, Validators.minLength(6)]],

    });
  }

  onSubmit(form: any): void {
    if (this.f.valid) {

      let authFlow=this.authService.login(this.f.value)
      .pipe(switchMap(() => this.authService.profile()));


      authFlow.subscribe({
        next: (user) => {
          this.authService.saveUserToLocalStorage(user);
          // console.log(user);
          this.notificationService.showSuccess(user.first_name+" "+user.last_name, "Login Success")
          this.router.navigate(['/dashboard/home']);
        },
        error: (error) => {
          console.log(error);
          this.notificationService.showError(error.error, "Login Failed")
          this.f.reset();
        }
      });

    } else {

      let temp = this.f.controls['name'];
      console.log('the controls', this.f.controls);
      console.log('name form', temp);
    }

  }
  onReset(): void {
    this.f.reset();
  }

  // onSignUpClick(){
  //   this.router.navigate(['/']);
  // }

}
