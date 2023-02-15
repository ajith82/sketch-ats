import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  details:any;
  selectedOne:any;
  photoUrl:any;
  constructor(private profileService:ProfileService) { }

  ngOnInit(): void {
    this.profileService.getDetails().subscribe((res) => {
      this.details = res;
      this.selectedOne = this.details[this.details.length - 1];
      this.photoUrl = this.selectedOne.user.photoURL;
      console.log(this.selectedOne);
    })
  }

}
