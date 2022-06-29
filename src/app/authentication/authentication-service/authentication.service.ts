import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndPoint } from 'src/app/environments';
import { LoginCredential } from '../authentication-model/logincredential';
import { UserSignUp } from '../authentication-model/usersignup';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  fun(): string {
    return apiEndPoint.LOGIN_PATH;
  }
  // userLogin(email: any, password: any) {
  //   let endpoint = apiEndPoint.LOGIN_PATH;
  //   this.http.post(endpoint, {email, })
  // }

  healthCheck() {
    let endpoint = apiEndPoint.HEALTH_PATH;
    return this.http.get(endpoint);
  }

  userLogin(userCredentials: LoginCredential) {
    let endpoint = apiEndPoint.LOGIN_PATH;
    return this.http.post(endpoint, userCredentials, { observe: 'body' });
  }

  userValidateUsingToken(token: string) {
    let endpoint = apiEndPoint.VALIDATE_TOKEN_PROFILE_PATH;

    let myheader = new HttpHeaders({
      'Content-Type': 'application/json',
      authorizationToken: token,
      'Access-Control-Allow-Origin': '*',
    });

    return this.http.get(endpoint, { observe: 'body', headers: myheader });
  }

  userSignUp(userSignup: UserSignUp) {
    let endpoint = apiEndPoint.SIGN_UP_PATH;
    return this.http.post(endpoint, userSignup, {
      observe: 'body',
    });
  }

  forgetPasswordSendEmailVerification(email: string) {
    let endpoint = apiEndPoint.FORGET_PASSWORD_PATH + '?email=' + email; //http://localhost:8100/forget?email=biswajeet163%40gmail.com
    return this.http.get(endpoint);
  }

  validateORExpiryToken(token: string | null) {
    let endpoint = apiEndPoint.VALIDATE_TOKEN_PATH + token;
    return this.http.get(endpoint);
  }

  updateUserWithNewPassword(resetUserData: UserSignUp | undefined) {
    let endpoint = apiEndPoint.RESET_PASSWORD_PATH;
    return this.http.post(endpoint, resetUserData, {
      observe: 'body',
    });
  }
}
