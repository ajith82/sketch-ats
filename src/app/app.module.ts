import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { OAuthModule, OAuthStorage, OAuthService } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { MatIconModule, MatButtonModule } from '@angular/material';

import { PROFILE_SERVICE } from './login.service';
import { ProfileService } from './profile.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import { LoginBtnComponent } from './login-btn/login-btn.component';
import { HomeComponent } from './home/home.component';

const firebaseConfig = {
  apiKey: 'AIzaSyCKl_liexseAYPKW_9tr3FgN2ztobjQLzs',
  authDomain: 'numeric-elixir-377706.firebaseapp.com',
  projectId: 'numeric-elixir-377706',
  storageBucket: 'numeric-elixir-377706.appspot.com',
  messagingSenderId: '1088393497169',
  appId: '1:1088393497169:web:aa34f614eba68c06098670',
  measurementId: 'G-Q0211F5RSY',
};

@NgModule({
  declarations: [
    AppComponent,
    LoginAuthComponent,
    LoginBtnComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
