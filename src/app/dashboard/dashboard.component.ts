import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../profile.service';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isLoginAuth = true;
  data: any;
  offerAccepted: any;
  candidateReject: any;
  candidateJoined: any;
  candidateDeclined: any;
  offered: any;
  offeredTitle: string = 'Offered';
  offerAcceptedTitle:string="Offer Accepted";
  offerDeclinedTitle:string="Offer Declined";
  offerRejectedTitle:string="Offer rejected";
  joinedTitle:string="Candidates Joined";
  @ViewChild(DaterangepickerDirective, { static: true })
  picker!: DaterangepickerDirective;
  selected!: { startDate: moment.Moment; endDate: moment.Moment };
  candidateSkillSetsArr = [
    'UI UX Design',
    'Lead Generation',
    'Motion Graphics Designer',
    'React Js',
    'Angular Js',
    'Vue Js',
    'React Native',
    'Flutter',
    'Node Js',
    'UI Development',
    'GO Lang',
    'Python',
    'Ruby on Rails',
    'Software Tester',
    'Devops',
  ];

  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileService.sendAnalytics().subscribe((res) => {});

    this.profileService.candidateDashboard().subscribe((res: any) => {
      this.data = res.data;
    });

    this.profileService.offerAccepted().subscribe((res) => {
      this.offerAccepted = res.data.getCandidatesofferAccepted;
      this.candidateReject = res.data.getCandidatesRejected;
      this.candidateJoined = res.data.getCandidatesJoined;
      this.candidateDeclined = res.data.getCandidatesOfferDeclined;
      this.offered = res.data.getCandidatesoffered;
    });
  }

  dashFilter(event: any) {
    this.profileService.dashFilter(event.target.value).subscribe((res) => {
      this.offerAccepted = res.data.getCandidatesofferAccepted;
      this.candidateReject = res.data.getCandidatesRejected;
      this.candidateJoined = res.data.getCandidatesJoined;
      this.candidateDeclined = res.data.getCandidatesOfferDeclined;
      this.offered = res.data.getCandidatesoffered;
    });
  }
}
