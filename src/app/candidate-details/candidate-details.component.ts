import { Router } from '@angular/router';
import { ProfileService } from './../profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {
detailBtn = true;
pipeLineBtn = false;
data:any;
fullName:any;
phoneNumber:any;
expectedSalaryPerMonth:any;
expectedSalaryPerYear:any;
sidenavOpen: boolean = false;
showAddress:boolean = false;
source:any;
notes:any;
addedBy:any;
expectedJoiningDate: any;
candidateStatus:any;
SourceArr = [
  "Naukri",
  "Linkedin",
  "Monster",
  "Indeed",
  "Hirect",
  "Angelist",
  "PyjamaHr",
  "Referral",
  "Others"
];
  constructor(private profileService:ProfileService, private route: Router) { }

  ngOnInit(): void {
    this.profileService.getCandDetails().subscribe((res) => {
      console.log("gottttttt",res);
      this.data = res.data.getCandidates;
      this.fullName = `${this.data.firstName} ${this.data.lastName}`
      this.phoneNumber = `${this.data.phoneNumber}`
      this.expectedSalaryPerYear = `${this.data.expectedSalaryPerYear}`
      this.expectedSalaryPerMonth = `${this.data.expectedSalaryPerMonth}`
      this.source = `${this.data.source}`
      this.notes = `${this.data.remarks}`
      this.addedBy = `${this.data.interviewBy}`
      this.expectedJoiningDate = new Date(this.data.expectedJoiningDate).toISOString().substr(0, 10);
    })
  }

  details(){
    this.detailBtn = true;
    this.pipeLineBtn = false;
  }

  pipeLine(id:any){    
    this.detailBtn = false;
    this.pipeLineBtn = true;
    this.profileService.pipeLine(id).subscribe((res) => {
      console.log("pipeeeeee",res.data.hiringStatus);
      this.candidateStatus = res.data.hiringStatus;
    })
  }

  editBtn(){
    this.sidenavOpen = true;
  }

  editCand(){
    console.log(this.data);
    this.fullName = `${this.data.firstName} ${this.data.lastName}`
    this.expectedSalaryPerYear = `${this.data.expectedSalaryPerYear}`
    this.phoneNumber = `${this.data.phoneNumber}`
    this.expectedSalaryPerMonth = `${this.data.expectedSalaryPerMonth}`
    this.source = `${this.data.source}`
    this.notes = `${this.data.remarks}`
    this.addedBy = `${this.data.interviewBy}`
    this.profileService.editCandidate(this.data).subscribe((res) => {
      console.log("edit donm",res);
    })
    // this.route.navigate(['candiadte']);
    this.sidenavOpen = false;
  }

  closeSidenav(){
    this.sidenavOpen = false;
  }

  showAddressTab(){
    this.showAddress = !this.showAddress
  }
}
