import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/compat';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  details: any;
  selectedOne: any;
  photoUrl: any;
  showDropdown: boolean = false;
  isAdminPage: boolean = false;
  isHomePage: boolean = false;
  userLogo?: string;
  constructor(
    private profileService: ProfileService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.profileService.getString().subscribe((res) => {
      localStorage.setItem('logo',res);
      this.userLogo = res;
      this.details = res;
      this.selectedOne = this.details[this.details.length - 1];
      this.photoUrl = this.selectedOne.user.photoURL;
    });
    this.isAdminPage = window.location.pathname === '/admin';
    this.isHomePage = window.location.pathname === '/';
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['']).then(() => {
      window.location.reload();
    });
    // location.reload();
  }
  adminRoute() {
    this.route.navigate(['admin']).then(() => {
      window.location.reload();
    });
  }
  candRoute() {
    this.route.navigate(['candiadte']).then(() => {
      window.location.reload();
    });
  }
}
