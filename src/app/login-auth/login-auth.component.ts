import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { ProfileService } from '../profile.service';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.css'],
})
export class LoginAuthComponent implements OnInit {
  // i18n: OAuthLoginI18n = {
  //   username: 'Username',
  // };
  state = 'some_salt_hash_or_whatever';
  useLogoutUrl = true;
  provider: any;
  credential: any;
  succeed: any;
  details: any;
  id: any;
  data: any;
  resToken: any;
  firstLetterFirstName?: string;
  firstLetterLastName?: string;
  googleLogoURL =
    'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';
  constructor(
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private profileService: ProfileService
  ) {
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.googleLogoURL)
    );
  }
  ngOnInit(){
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      console.log('google inn');
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: '934254784491-2nesacf8r403tr9hdbfpuln9g303nq11.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      // @ts-ignore
      google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", width: "100%" } 
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };
  }

  async handleCredentialResponse(response:CredentialResponse ) {
    console.log(response);
    this.googleLogin(response.credential);
  }


  async loginWithGoogle() {
    // this.provider = new auth.GoogleAuthProvider();
    // const credential = await this.afAuth.signInWithPopup(this.provider);
    // return credential;
  }

  signInWithGoogle() {
    // this.provider = new auth.GoogleAuthProvider();
    // this.afAuth.signInWithPopup(this.provider)
    //   .then((credential) => {
    //     this.details = credential;
    //   this.id=credential.operationType;
    //     if (credential.additionalUserInfo?.profile) {
    //       this.profileService.details(this.details).subscribe((data) =>{
    //       })
    //   localStorage.setItem('id',this.id);
    //       this.router.navigate(['dashboard']).then(() => {
    //         window.location.reload();
    //       });
    //     } else {
    //       this.router.navigate(['']);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  googleLogin(response:string) {
    this.profileService.googleAuth(response).subscribe((res) => {
      this.resToken = res.data.token;
      const nameparts = res.data.name.split(' ');
      this.firstLetterFirstName = nameparts[0].charAt(0);
      this.firstLetterLastName = nameparts[1].charAt(0);
      const toasterMessage = 'Login successful!';
      sessionStorage.setItem('toasterMessage', toasterMessage);
      const dynamicLogo = `${this.firstLetterFirstName}${this.firstLetterLastName}`;
      this.profileService.setString(
        `${this.firstLetterFirstName}${this.firstLetterLastName}`
      );
      localStorage.setItem(
        'logo',
        `${this.firstLetterFirstName}${this.firstLetterLastName}`
      );
      localStorage.setItem('token', this.resToken);
      this.router.navigate(['candiadte']).then(() => {
        window.location.reload();
      });
    });
  }
}
