import { Component, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/authentication/authentication-model/loginResponse';
import { AuthenticationService } from 'src/app/authentication/authentication-service/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loginResponse: LoginResponse | undefined;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    console.log(token);

    if (token !== null)
      this.authenticationService.userValidateUsingToken(token).subscribe({
        next: (data: any) => {
          console.log('done');
          if (this.loginResponse === undefined) {
            this.loginResponse = data;
            console.log(data);
          }
        },
        error: () => {
          console.log('error');
        },
      });
  }
}
