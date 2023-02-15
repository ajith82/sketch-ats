import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  details:any;
  constructor(private profileService:ProfileService) { }

  ngOnInit(): void {    
    this.profileService.getDetails().subscribe((res) => {
      console.log(res);
      this.details = res;
    })
  }

}
