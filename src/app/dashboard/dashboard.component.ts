import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../profile.service';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoginAuth = true;
  data:any;
  offerAccepted:any;
  candidateReject:any;
  candidateJoined:any;
  candidateDeclined:any;
  offered:any;
  @ViewChild(DaterangepickerDirective, {static: true}) picker!: DaterangepickerDirective;
  selected!: {startDate: moment.Moment, endDate: moment.Moment};

  constructor(private http: HttpClient, private profileService: ProfileService) { }

  ngOnInit(): void {    
      this.profileService.sendAnalytics().subscribe(res => {
        console.log("resssss",res);
      })

      this.profileService.candidateDashboard().subscribe((res: any) => {
        console.log("vvvvvvvvvvvvv",res);
        this.data = res.data;
      })

      this.profileService.offerAccepted().subscribe((res) => {
        console.log("acccccc",res);
        this.offerAccepted = res.data.getCandidatesofferAccepted;
        this.candidateReject = res.data.getCandidatesRejected;
        this.candidateJoined = res.data.getCandidatesJoined;
        this.candidateDeclined = res.data.getCandidatesOfferDeclined;
        this.offered = res.data.getCandidatesoffered;
      })

      this.profileService.getCandidates().subscribe(res => {
        // this.offerAccepted = res.data.getCandidatesJoined;
        // this.candidateReject = res.data.getCandidatesRejected;
        // this.candidateJoined = res.data.getCandidatesJoined;
        // this.candidateDeclined = res.data.getCandidatesOfferDeclined;
        // this.offered = res.data.getCandidatesoffered;
        console.log("candidatesssss",res);
      })
  }

}
