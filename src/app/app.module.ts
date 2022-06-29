import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeTimeLineComponent } from './tweeter/home-time-line/home-time-line.component';
import { UserTimeLineComponent } from './tweeter/user-time-line/user-time-line.component';
import { PostTweetComponent } from './tweeter/post-tweet/post-tweet.component';
import { ProfileComponent } from './tweeter/profile/profile.component';
import { MenuComponent } from './tweeter/menu/menu.component';
import { HeaderComponent } from './tweeter/header/header.component';
import { TweeterComponent } from './tweeter/tweeter.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomeTimeLineComponent,
    UserTimeLineComponent,
    PostTweetComponent,
    ProfileComponent,
    MenuComponent,
    HeaderComponent,
    TweeterComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
