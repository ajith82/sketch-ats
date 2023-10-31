import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  details:any;
  isLoginAuth = false;
  location :any;
  constructor(private profileService:ProfileService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginAuth = event.url.includes('/login-auth');
      }
    });
   }

  ngOnInit(): void {    
    // this.profileService.getDetails().subscribe((res) => {
    //   this.details = res;
    //   this.details.length

    //   this.location = location.href;
      


    //   // this.router.events.subscribe(event => {
    //   //   if (event instanceof NavigationEnd) {
    //   //     window.location.reload();
    //   //   }
    //   // });
    // })
  }

}
