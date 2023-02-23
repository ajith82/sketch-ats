import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from './../profile.service';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() candidate: any;
  data:any;
  tempData:any;
  controllerSrc!: SafeUrl;
  constructor(private profileService: ProfileService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.profileService.candidateDetails().subscribe((data) => {
      this.data = data;
      const resumeUrl = data?.data?.getCandidates[0]?.resume;
      if (resumeUrl) {
        this.controllerSrc = this.sanitizer.bypassSecurityTrustResourceUrl(resumeUrl);
      }
      console.log("resumeUrl",this.controllerSrc);
      
      this.tempData = data.data.getCandidates[0].resume;
      this.controllerSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.tempData);
      console.log("cccccccccccccccc",this.controllerSrc);
      
    })
  }

}
