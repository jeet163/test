import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredential } from './authentication-model/logincredential';
import { LoginResponse } from './authentication-model/loginResponse';
import { UserSignUp } from './authentication-model/usersignup';

import { AuthenticationService } from './authentication-service/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  errorMsg: string = '';

  userPage: string = 'login';
  loginError: boolean = false;

  forgetStatus: boolean = false;
  forgetPasswordResult: string = '';

  loginResponse!: LoginResponse;

  changeUserPage(userPage: string) {
    this.userPage = userPage;
  }

  onLoginSubmit(data: NgForm) {
    let username = data.value.email;
    let password = data.value.password;

    let userCredentials = new LoginCredential();
    userCredentials.email = username;
    userCredentials.password = password;
    console.log(userCredentials);
    this.authenticationService.userLogin(userCredentials).subscribe({
      next: (data: any) => {
        console.log(JSON.stringify(data, null, 2));
        this.loginResponse = data;

        //  cookies valuessss
        localStorage.clear();
        localStorage.setItem('userId', this.loginResponse.userId.toString());
        localStorage.setItem(
          'userFullName',
          this.loginResponse.firstName + ' ' + this.loginResponse.lastName
        );
        localStorage.setItem('email', this.loginResponse.email);
        localStorage.setItem('validUpTo', '');
        localStorage.setItem('token', this.loginResponse.jwttoken);
        console.log(this.loginResponse.validUpTo.toString());
        this.router.navigate([`tweeter`]);
      },
      error: (d) => {
        this.loginError = true;
      },
    });
  }

  onSignupSubmit(data: NgForm) {
    if (
      data.form.controls['firstname'].value === '' ||
      data.form.controls['lastname'].value === '' ||
      data.form.controls['contact'].value === '' ||
      data.form.controls['email'].value === '' ||
      data.form.controls['password1'].value === '' ||
      data.form.controls['password2'].value === ''
    ) {
      console.log('All fields are Mandate');
      this.errorMsg = 'All fields are Mandate';
    } else if (data.form.controls['email'].value.includes('@') === false) {
      console.log('Provide correct mail');
      this.errorMsg = 'Provide correct mailId';
    } else if (
      data.form.controls['password1'].value !==
      data.form.controls['password2'].value
    ) {
      console.log('Password Mismath');
      this.errorMsg = 'Password Mismath';
    } else {
      this.errorMsg = 'Successfully Registered';
      // console.log(data.form.controls['firstname'].value)

      // check if pass1 and pass2 are equal
      let userSignup = new UserSignUp();
      userSignup.firstName = data.value.firstname;
      userSignup.lastName = data.value.lastname;
      userSignup.email = data.value.email;
      userSignup.phone = data.value.contact;
      userSignup.password = data.value.password1;

      this.authenticationService.userSignUp(userSignup).subscribe((data) => {
        console.log(data);
      });
    }
  }

  onForgetPasswordSubmit(data: NgForm) {
    console.log(data.value);

    this.authenticationService
      .forgetPasswordSendEmailVerification(data.value.email)
      .subscribe({
        next: (data: any) => {
          this.forgetPasswordResult = data;
          this.forgetStatus = true;
          console.log('--------->>>');
          console.log(data);
        },
        error: (e) => {
          if (e.status === 200) {
            this.changeUserPage('login');
            this.forgetPasswordResult = 'Mail Sent!!';
            this.forgetStatus = true;
          } else {
            this.forgetPasswordResult = 'This Email Do Not Exist';
            this.forgetStatus = true;
          }
        },
        complete: () => {},
      });
  }
}
