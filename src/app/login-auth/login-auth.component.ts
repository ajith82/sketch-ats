import { Component, OnInit } from '@angular/core';
import { OAuthLoginI18n } from 'ngx-oauth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.css'],
})
export class LoginAuthComponent implements OnInit {
  i18n: OAuthLoginI18n = {
    username: 'Username',
  };
  state = 'some_salt_hash_or_whatever';
  useLogoutUrl = true;
  provider: any;
  credential: any;
  succeed:any;
  details:any;
  googleLogoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private profileService: ProfileService
  ) {
    this.matIconRegistry.addSvgIcon(
"logo",
this.domSanitizer.bypassSecurityTrustResourceUrl(this.googleLogoURL));
}
  ngOnInit(): void {}

  async loginWithGoogle() {
    this.provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(this.provider);
    return credential;
  }

  signInWithGoogle() {
    this.provider = new auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(this.provider)
      .then((credential) => {
        this.details = credential;
        console.log("credential",credential);
        if (credential.additionalUserInfo?.profile) {
          this.profileService.details(this.details).subscribe((data) =>{
            
          })
          this.router.navigate(['home']);
        } else {
          console.log('oops');
          this.router.navigate(['']);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
