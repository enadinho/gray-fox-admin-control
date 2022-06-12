import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  f: FormGroup;
  constructor(private fb: FormBuilder, 
              private router: Router) {

    this.f = this.fb.group({
      name: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,, Validators.minLength(6)]],

    });
  }

  onSubmit(form: any): void {
    if (this.f.valid) {
      // alert('login successful')
      this.router.navigate(['/dashboard/home']);
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
