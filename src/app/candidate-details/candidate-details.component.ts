import { ProfileService } from './../profile.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css'],
})
export class CandidateDetailsComponent implements OnInit {
  detailBtn = true;
  pipeLineBtn = false;
  data: any;
  fullName: any;
  phoneNumber: any;
  expectedSalaryPerMonth: any;
  expectedSalaryPerYear: any;
  sidenavOpen: boolean = false;
  source: any;
  notes: any;
  addedBy: any;
  expectedJoiningDate: any;
  candidateStatus: any;
  isCandidate: boolean = false;
  detailsClicked = true;
  pipelineClicked = false;
  bgDark: boolean = false;
  constructor(
    private profileService: ProfileService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.profileService.getCandDetails().subscribe((res) => {
      this.data = res.data.getCandidates;
      this.fullName = `${this.data.firstName} ${this.data.lastName}`;
      this.phoneNumber = `${this.data.phoneNumber}`;
      this.expectedSalaryPerYear = `${this.data.expectedSalaryPerYear}`;
      this.expectedSalaryPerMonth = `${this.data.expectedSalaryPerMonth}`;
      this.source = `${this.data.source}`;
      this.notes = `${this.data.remarks}`;
      this.addedBy = `${this.data.interviewBy}`;
      this.expectedJoiningDate = new Date(this.data.expectedJoiningDate)
        .toISOString()
        .substr(0, 10);
    });
  }

  details() {
    this.detailBtn = true;
    this.pipeLineBtn = false;

    this.detailsClicked = true;
    this.pipelineClicked = false;
  }

  goBack() {
    this._location.back();
  }

  resumeClick(resume: any) {
    window.open(resume);
  }

  pipeLine(id: any) {
    this.detailBtn = false;
    this.pipeLineBtn = true;
    this.profileService.pipeLine(id).subscribe((res) => {
      this.candidateStatus = res.data.hiringStatus;
    });

    this.detailsClicked = false;
    this.pipelineClicked = true;
  }

  editBtn() {
    this.sidenavOpen = true;
    this.bgDark = true;
  }

  changeStatus() {
    this.isCandidate = true;
  }
}
