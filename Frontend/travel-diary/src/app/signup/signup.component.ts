import { Router } from '@angular/router';
import { SignupUser } from './../models/signupUser';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[AuthService]
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  signupForm: FormGroup;
  signupUser: any = {};
  ngOnInit() {
    if (this.authService.signedin()) {
      this.router.navigateByUrl('travels');
    }
    this.createSignupForm();
  }

  createSignupForm() {
    this.signupForm = this.formBuilder.group(

      {
        username: new FormControl(this.signupUser.username ,[ Validators.required]) ,
        email: new FormControl(this.signupUser.email ,[ Validators.required]),
        password: new FormControl(this.signupUser.password,[ Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16)]),
        confirmPassword: new FormControl(this.signupUser.confirmPassword ,[ Validators.required])
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {

    return g.get('password').value === g.get('confirmPassword').value ? null : { misMatch: true };


  }

  signup() {
    if (this.signupForm.valid) {
      this.signupUser = Object.assign({}, this.signupForm.value);
      this.authService.signup(this.signupUser);
      
    }

  }


}
