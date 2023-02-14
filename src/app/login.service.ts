import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { LoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';


export interface LoginService {
  get profileName$(): Observable<string | undefined>;

}
export const PROFILE_SERVICE = new InjectionToken<LoginService>('LoginService');