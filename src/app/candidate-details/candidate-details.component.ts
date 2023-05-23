import { Router } from '@angular/router';
import { ProfileService } from './../profile.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
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
  showAddress: boolean = false;
  source: any;
  notes: any;
  items: any = [];
  educationBtn: boolean = false;
  id=1;
  addedBy: any;
  expectedJoiningDate: any;
  candidateStatus: any;
  candidateStatus$!: Observable<any[]>;
  updateCandidateStatus: any;
  comment: any;
  isCandidate: boolean = false;
  updatedData: any;
  detailsClicked = true;
  pipelineClicked = false;
  bgDark: boolean = false;
  SourceArr = [
    'Naukri',
    'Linkedin',
    'Monster',
    'Indeed',
    'Hirect',
    'Angelist',
    'PyjamaHr',
    'Referral',
    'Others',
  ];
  month = [1,2,3,4,5,6,7,8,9,10,11]
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  constructor(
    private profileService: ProfileService,
    private route: Router,
    private _location: Location
  ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  ngOnInit(): void {
    this.profileService.getCandDetails().subscribe((res) => {
      console.log('gottttttt', res);
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
    this.updateStatus();
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  addEduu() {
    if (!this.educationBtn) {
      this.items.push({
        institute: '',
        degree: '',
        startTime: '',
        endTime: '',
      });
      this.id++;
      console.log(this.items);
    }
  }


  deleteEdu(id:any) {
    this.items.splice(id, 1);
    console.log(this.items);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
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
      console.log('pipeeeeee', res.data.hiringStatus);
      this.candidateStatus = res.data.hiringStatus;
    });

    this.detailsClicked = false;
    this.pipelineClicked = true;
  }

  editBtn() {
    this.sidenavOpen = true;
    this.bgDark = true;
  }

  editCand() {
    
    const newData = {
      ...this.data,
      educationInfo: this.items
    }
    this.fullName = `${this.data.firstName} ${this.data.lastName}`;
    this.expectedSalaryPerYear = `${this.data.expectedSalaryPerYear}`;
    this.phoneNumber = `${this.data.phoneNumber}`;
    this.expectedSalaryPerMonth = `${this.data.expectedSalaryPerMonth}`;
    this.source = `${this.data.source}`;
    this.notes = `${this.data.remarks}`;
    this.addedBy = `${this.data.interviewBy}`;
    this.profileService.editCandidate(newData,this.items).subscribe((res) => {
      console.log('edit donm', res);
    });
    // this.route.navigate(['candiadte']);

    this.sidenavOpen = false;
    this.bgDark = false;
  }

  closeSidenav() {
    this.sidenavOpen = false;
    this.bgDark = false;
  }

  showAddressTab() {
    this.showAddress = !this.showAddress;
  }

  changeStatus() {
    this.isCandidate = true;
  }

  updateStatus() {
    const statusUpdate = {
      status: this.updateCandidateStatus,
      remarks: this.comment,
      modifiedBY: this.data.modifiedBY,
      _id: this.data._id,
    };
    console.log(statusUpdate);
    this.profileService.statusUpdate(statusUpdate).subscribe((res) => {
      console.log('updateddddddd', res.data.hiringStatus);

      // this.candidateStatus = res.data.hiringStatus;
      this.candidateStatus.push(res.data.hiringStatus);
    });
    this.profileService.pipeLine(statusUpdate._id).subscribe((res) => {
      console.log('dataaa', res.data.hiringStatus);
      // this.candidateStatus = res.data.hiringStatus;
    });
    this.isCandidate = false;
  }

  closeStatus() {
    this.isCandidate = false;
  }

  deleteStatus(data: any) {
    const candidateId = data.candidateId;
    const statusId = data._id;
  
    this.profileService.deleteStatus(candidateId, statusId).subscribe(() => {
      this.profileService.pipeLine(candidateId).subscribe((res) => {
        console.log(res);
        this.candidateStatus = res.data.hiringStatus;
      });
    });
  }
  
}
