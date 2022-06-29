import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { HomeTimeLineComponent } from './tweeter/home-time-line/home-time-line.component';
import { ProfileComponent } from './tweeter/profile/profile.component';
import { TweeterComponent } from './tweeter/tweeter.component';
import { UserTimeLineComponent } from './tweeter/user-time-line/user-time-line.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent },
  { path: 'passwordreset/token/:token', component: ResetPasswordComponent },

  {
    path: 'tweeter',
    component: TweeterComponent,
    canActivate: [AuthGuardService],
    children: [
      // { path: '', redirectTo: '/home', pathMatch: 'prefix' },
      { path: '', component: HomeTimeLineComponent },
      { path: 'home', component: HomeTimeLineComponent },
      { path: 'user', component: UserTimeLineComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },

  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
