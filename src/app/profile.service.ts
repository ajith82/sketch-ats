import { Injectable } from '@angular/core';
import {OAuthService} from 'ngx-oauth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private oauthService: OAuthService) { }

  get profileName$(): Observable<string | undefined> {
    return this.oauthService.userInfo$.pipe(
      map(v => `${v.name}&nbsp;${this.getPicture(v.picture)}`)
    );
  }

  getPicture(picture?: string) {
    return picture && `<img class="rounded-circle img-thumbnail" src="${picture}">` || ''
  }
}
