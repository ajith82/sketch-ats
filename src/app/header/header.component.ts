import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/compat';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  details:any;
  selectedOne:any;
  photoUrl:any;
  showDropdown: boolean = false;
  constructor(private profileService:ProfileService, private route:Router) { }

  ngOnInit(): void {
    this.profileService.getDetails().subscribe((res) => {
      this.details = res;
      this.selectedOne = this.details[this.details.length - 1];
      this.photoUrl = this.selectedOne.user.photoURL;
    })
  }

  toggleDropdown(){
    this.showDropdown = !this.showDropdown;
  }
  logout(){
    localStorage.removeItem("id");
    this.route.navigate(['']).then(() =>{
      window.location.reload();
    });
    // location.reload();
  }

}
