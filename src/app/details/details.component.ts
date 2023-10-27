import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  @Input() sidenavOpen: boolean = false;
  @Input() bgDark: boolean = false;
  detailBtn = true;
  data: any;
  month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  phoneNumber: any;
  fullName!: string;
  expectedSalaryPerYear: any;
  expectedSalaryPerMonth: any;
  source!: string;
  notes: any;
  addedBy!: string;
  expectedJoiningDate: any;
  closeResume: boolean = false;
  candidateResume: any;
  items: any = [];
  expItems: any = [];
  selectedSkills: any[] = [];
  dropdownSettings: any = {};
  dropdownList: any = [];
  selectedItems: any = [];
  showAddress: boolean = false;
  educationBtn: boolean = false;
  id = 1;
  experienceBtn: boolean = false;
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

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.dropdownList = [
      { item_id: 1, item_text: 'ReactJS' },
      { item_id: 2, item_text: 'Angular' },
      { item_id: 3, item_text: 'NodeJS' },
      { item_id: 4, item_text: 'UI UX Design' },
    ];

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

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  details() {
    this.detailBtn = true;
  }

  closeSidenav() {
    this.sidenavOpen = false;
    this.bgDark = false;
  }

  deleteResume() {
    this.closeResume = true;
  }

  resumeClick(resume: any) {
    window.open(resume);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.candidateResume = file;
  }

  editCand() {
    const newData = {
      ...this.data,
      educationInfo: this.items,
      experienceInfo: this.expItems,
      resume: this.candidateResume,
      skillSet: this.selectedSkills,
    };
    this.fullName = `${this.data.firstName} ${this.data.lastName}`;
    this.expectedSalaryPerYear = `${this.data.expectedSalaryPerYear}`;
    this.phoneNumber = `${this.data.phoneNumber}`;
    this.expectedSalaryPerMonth = `${this.data.expectedSalaryPerMonth}`;
    this.source = `${this.data.source}`;
    this.notes = `${this.data.remarks}`;
    this.addedBy = `${this.data.interviewBy}`;
    this.profileService
      .editCandidate(newData, this.items)
      .subscribe((res) => {});
    // this.route.navigate(['candiadte']);

    this.sidenavOpen = false;
    this.bgDark = false;
  }

  onItemSelect(item: any) {
    const selectedSkill = item.item_text;
    this.selectedSkills.push({
      label: selectedSkill,
      value: selectedSkill,
    });
  }

  showAddressTab() {
    this.showAddress = !this.showAddress;
  }

  onSelectAll(items: any) {}

  addEduu() {
    if (!this.educationBtn) {
      this.items.push({
        institute: '',
        degree: '',
        startTime: '',
        endTime: '',
      });
      this.id++;
    }
  }

  deleteEdu(id: any) {
    this.items.splice(id, 1);
  }

  deleteExp(id: any) {
    this.expItems.splice(id, 1);
  }

  addExp() {
    if (!this.experienceBtn) {
      this.expItems.push({
        company: '',
        jobTitle: '',
        startTime: '',
        endTime: '',
      });
      this.id++;
    }
  }
}
