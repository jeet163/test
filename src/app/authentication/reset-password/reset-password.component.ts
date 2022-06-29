import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSignUp } from '../authentication-model/usersignup';
import { AuthenticationService } from '../authentication-service/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {}

  showResetForm: boolean = false;
  tokenInvalid: boolean = false;
  passwordChanged: boolean = false;
  passMissMatch: boolean = false;

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const token = routeParams.get('token');
    console.log('-----------TOKEN-----------');
    console.log(token);
    this.validateToken(token);
  }

  resetUserData: UserSignUp | undefined;
  validateToken(token: string | null) {
    // call http ti emailVerification
    this.authenticationService.validateORExpiryToken(token).subscribe({
      next: (data: any) => {
        this.resetUserData = data;
        this.showResetForm = true;
      },
      error: () => {
        this.tokenInvalid = true;
      },
    });
  }

  onResetSubmit(data: any) {
    console.log('----------------------');

    if (data.value.password1 !== data.value.password2) {
      this.passMissMatch = true;
    } else {
      this.passMissMatch = false;
      console.log(data.value);
      if (this.resetUserData !== undefined) {
        this.resetUserData.password = data.value.password1;
      }
      // call upate data
      this.authenticationService
        .updateUserWithNewPassword(this.resetUserData)
        .subscribe({
          next: (data: any) => {
            console.log('data----------------');
            this.passwordChanged = true;
            this.showResetForm = false;
          },
          error: (e) => {
            console.log('error----------------');
            console.log(e);
            if (e.status === 201) {
              this.passwordChanged = true;
              this.showResetForm = false;
            }
          },
        });
    }
  }
}
