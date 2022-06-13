import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

      this.authService.login(this.f.value).subscribe(
        res=> {
          console.log(res);
          if(res.token){
            this.notificationService.showSuccess(res.first_name+" "+res.last_name, "Login Success")
            this.router.navigate(['/dashboard/home']);
          }
        },
        err =>{
          console.log(err);
          this.notificationService.showError(err.error, "Login Failed")
          this.f.reset();
        }
      );

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
