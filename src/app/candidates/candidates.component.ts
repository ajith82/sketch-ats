import { ProfileService } from './../profile.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
})
export class CandidatesComponent implements OnInit {
  candidateDetails: any;
  status: any;
  length: any;
  page: number = 1;
  dataSource: any;
  config: any;
  dataSourceWithPageSize: any;
  showFiller = false;
  showSidenav = false;
  openPopup = false;
  totalCandidate?: number;
  noticePeriodFilter: any;
  sourceFilter: any;
  addedByFilter: any;
  id: any;
  selectedCandidate: any;
  sidenavOpen: boolean = false;
  resumeUrl: any;
  secureLink: any;
  updateCandidateStatus: any;
  selectedFilter?: string;
  comment: any;
  constValue: any;
  filterMsg: any;
  filterChips: boolean = true;
  noticeFilterChips: boolean = true;
  sourceFilterChips: boolean = true;
  addedByFilterChips: boolean = true;
  filterTabs: boolean = true;
  candidateIndo: any[] = [];
  serachValue: any;
  selectedOptions: string[] = [];
  @ViewChild(DaterangepickerDirective, { static: true })
  picker!: DaterangepickerDirective;
  selected!: { startDate: moment.Moment; endDate: moment.Moment };
  selectedIndex = 0;
  hideChipsFilter = true;

  NoticePeriodArr = [
    '15 Days',
    '30 Days',
    '45 Days',
    '60 Days',
    '90 Days',
    'Immediate joiner',
  ];

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

  interviewedByArr = [
    'Sketchbrahma Technologies',
    'Lakshmi Narasimhan Kumar',
    'Bharathi B',
    'Sahana Patil',
    'Shivakumar Swain',
  ];

  adminRoles = ['Admin', 'Manager', 'Recruiters', 'Interviewers', 'Users'];

  candidateStatusCustom = [
    { name: 'Candidates', api: 'Candidates', api_receiver: 'Candidates' },
    { name: 'Screening', api: 'Screening', api_receiver: 'screening' },
    { name: 'Round 1', api: 'Round 1', api_receiver: 'Round_1' },
    {
      name: 'Verification',
      api: 'Task Verification',
      api_receiver: 'taskVerification',
    },
    { name: 'Round 2', api: 'Round 2', api_receiver: 'Round_2' },
    { name: 'HR Round', api: 'HR Round', api_receiver: 'hrRound' },
    { name: 'Offered', api: 'Offered', api_receiver: 'offered' },
    { name: 'Accepted', api: 'Offer Accepted', api_receiver: 'offerAccepted' },
    { name: 'Declined', api: 'Offer Declined', api_receiver: 'OfferDeclined' },
    { name: 'Joined', api: 'Joined', api_receiver: 'joined' },
    { name: 'Rejected', api: 'Rejected', api_receiver: 'rejected' },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
    };
    this.route.queryParamMap
      .pipe(map((params: any) => params.get('page')))
      .subscribe((page: any) => {
        this.config.currentPage = page;
      });
  }

  ngOnInit(): void {
    this.selectedIndex = Number(sessionStorage.getItem('selectedIndex')) || 0;
    

    this.profileService.candidateDetails().subscribe((res) => {
      let storage = localStorage.getItem('token');
      if (!storage) {
        this.candidateIndo = res.data.searchResults;
      }
      this.filterMsg = res.message;
      this.totalCandidate = res.data.totalCount;
      this.candidateDetails = res.data.getCandidates;
      this.dataSourceWithPageSize = new MatTableDataSource(
        this.candidateDetails
      );
      this.dataSource = new MatTableDataSource(this.candidateDetails);
      this.length = res.data.totalCount;
    });

    this.selectedFilter = sessionStorage.getItem('selectedFilter') || '';
    // sessionStorage.getItem('noticePeriod');
    this.noticePeriodFilter = sessionStorage.getItem('noticeFilter') || '';
    this.sourceFilter = sessionStorage.getItem('sourceFilter') || '';
    this.addedByFilter = sessionStorage.getItem('addedByFilter') || '';
    if (!this.selectedFilter) {
      this.selectedFilter = '';
      this.filterChips = false;
    }
    if (!this.noticePeriodFilter) {
      this.noticePeriodFilter = '';
      this.noticeFilterChips = false;
    }
    if (!this.sourceFilter) {
      this.sourceFilter = '';
      this.sourceFilterChips = false;
    }
    if (!this.addedByFilter) {
      this.addedByFilter = '';
      this.addedByFilterChips = false;
    }

    this.constValue = sessionStorage.getItem('candidateInfo') || '';
    if (this.constValue) {
      const toasterMessage = sessionStorage.getItem('toasterMessage');
      if (toasterMessage) {
        const toasterContainer = document.getElementById('toasterContainer');
        toasterContainer!.innerText = toasterMessage;
        toasterContainer!.classList.add('show');

        setTimeout(() => {
          toasterContainer!.classList.remove('show');
          sessionStorage.removeItem('toasterMessage');
        }, 3000);
        // sessionStorage.removeItem('toasterMessage');
      }
      this.candidateIndo = JSON.parse(this.constValue);
    } else {      
      this.profileService
        .getCandidate(this.candidateStatusCustom[0].api)
        .subscribe((res) => {
          this.config.totalItems = res.data.totalCount;
          this.candidateIndo = res.data.searchResults;          
          sessionStorage.setItem(
            'candidateInfo',
            JSON.stringify(this.candidateIndo)
          );
        });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
  }

  gty(newPage: number) {
    this.page = newPage;
    this.profileService.paginate(newPage).subscribe((res) => {
      this.candidateIndo = res.data.searchResults;
    });
    this.router.navigate(['candiadte'], { queryParams: { page: newPage } });
  }

  resumeClick(candidate: any) {
    // this.showSidenav = true;
    // this.selectedCandidate = candidate;
    this.selectedCandidate = candidate;
    this.sidenavOpen = true;
    this.resumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.selectedCandidate?.resume
    );
    this.secureLink = `https://docs.google.com/gview?url=${this.resumeUrl}&embedded=true`;
  }

  closeSidenav() {
    this.sidenavOpen = false;
  }

  candStatus(id: any) {
    this.selectedIndex = id;
    this.profileService
      .getCandidate(this.candidateStatusCustom[id].api)
      .subscribe((res) => {
        this.config.totalItems = res.data.totalCount;
        this.candidateIndo = res.data.searchResults;

        window.sessionStorage.setItem('selectedIndex', id.toString());
        window.sessionStorage.setItem(
          'candidateInfo',
          JSON.stringify(this.candidateIndo)
        );
      });
      
  }

  search(value: any) {
    if (value == '') {
      this.hideChipsFilter = true;
      this.profileService.candidateDetails().subscribe((res) => {
        this.candidateIndo = res.data.searchResults;
      });
    } else {
      this.hideChipsFilter = false;
      this.profileService.search(value).subscribe((res) => {
        this.candidateIndo = res.data.searchResults;
      });
    }
  }

  candidatesDetails(id: any) {
    this.profileService.getCandidateDetails(id).subscribe((res) => {
    });
    this.router.navigate(['details']);
  }

  jobOpenings(event: any) {
    this.filterChips = true;
    this.filterTabs = false;
    this.addedByFilter = false;
    this.noticeFilterChips = false;
    this.sourceFilterChips = false;
    const selectElement = event.target as HTMLSelectElement;
    this.selectedFilter = selectElement.value;
    sessionStorage.removeItem('candidateInfo');
    sessionStorage.removeItem('noticeFilter');
    sessionStorage.removeItem('sourceFilter');
    sessionStorage.removeItem('addedByFilter');
    sessionStorage.setItem('selectedFilter', this.selectedFilter);
    this.profileService.jobOpening(this.selectedFilter).subscribe((res) => {
      this.filterMsg = res.message;
      this.candidateIndo = res.data.searchResults;
      sessionStorage.setItem(
        'candidateInfo',
        JSON.stringify(this.candidateIndo)
      );
    });
    if (this.selectedFilter == '') {
      this.filterChips = false;
    }
  }

  closeFilter() {
    this.selectedFilter = '';
    this.filterChips = false;
    this.filterTabs = true;
    sessionStorage.removeItem('selectedFilter');
    sessionStorage.removeItem('candidateInfo');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  noticePeriod(event: any) {
    this.noticeFilterChips = true;
    this.filterChips = false;
    this.addedByFilter = false;
    this.sourceFilterChips = false;
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    sessionStorage.removeItem('candidateInfo');
    sessionStorage.removeItem('selectedFilter');
    sessionStorage.removeItem('sourceFilter');
    sessionStorage.removeItem('addedByFilter');
    sessionStorage.setItem('noticeFilter', selectedValue);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 100);
    this.noticePeriodFilter = selectedValue;
    // sessionStorage.setItem('noticePeriod',this.noticePeriodFilter);
    this.profileService.noticePeriod(selectedValue).subscribe((res) => {
      this.filterMsg = res.message;
      this.candidateIndo = res.data.searchResults;
      sessionStorage.setItem(
        'candidateInfo',
        JSON.stringify(this.candidateIndo)
      );
    });
    // const notice = this.candidateIndo;
  }

  closeNoticeFilter() {
    this.noticeFilterChips = false;
    this.noticePeriodFilter = '';
    sessionStorage.removeItem('candidateInfo');
    sessionStorage.removeItem('noticeFilter');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  source(event: any) {
    this.noticeFilterChips = false;
    this.filterChips = false;
    this.addedByFilter = false;
    this.sourceFilterChips = true;
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    sessionStorage.removeItem('candidateInfo');
    sessionStorage.removeItem('selectedFilter');
    sessionStorage.removeItem('noticeFilter');
    sessionStorage.removeItem('addedByFilter');
    sessionStorage.setItem('sourceFilter', selectedValue);
    this.sourceFilter = selectedValue;
    this.profileService.source(selectedValue).subscribe((res) => {
      this.filterMsg = res.message;
      this.candidateIndo = res.data.searchResults;
      sessionStorage.setItem(
        'candidateInfo',
        JSON.stringify(this.candidateIndo)
      );
    });
  }

  closeSourceFilter() {
    this.sourceFilter = '';
    this.sourceFilterChips = false;
    sessionStorage.removeItem('candidateInfo');
    sessionStorage.removeItem('sourceFilter');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  addedBy(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.addedByFilter = true;
    this.noticeFilterChips = false;
    this.filterChips = false;
    this.sourceFilterChips = false;
    sessionStorage.removeItem('candidateInfo');
    sessionStorage.removeItem('selectedFilter');
    sessionStorage.removeItem('noticeFilter');
    sessionStorage.removeItem('sourceFilter');
    sessionStorage.setItem('addedByFilter', selectedValue);
    this.addedByFilter = selectedValue;
    this.profileService.addedBy(selectedValue).subscribe((res) => {
      this.filterMsg = res.message;
      this.candidateIndo = res.data.searchResults;
      sessionStorage.setItem(
        'candidateInfo',
        JSON.stringify(this.candidateIndo)
      );
    });
  }

  closeaddedByFilter() {
    this.addedByFilter = '';
    this.addedByFilterChips = false;
    sessionStorage.removeItem('candidateInfo');
    sessionStorage.removeItem('addedByFilter');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  date() {
    const endDate = this.selected.endDate;
    const endDateValue = endDate.get('date');
  }

  addOption(event: any): void {
    const selectedOption = event.target.value;
    if (selectedOption && !this.selectedOptions.includes(selectedOption)) {
      this.selectedOptions.push(selectedOption);
    }
  }

  removeOption(option: string): void {
    const index = this.selectedOptions.indexOf(option);
    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    }
  }

  getCandDetails(data: any) {
    this.openPopup = true;
    this.id = data._id;
  }

  closePopup() {
    this.openPopup = false;
  }

  updateStatus(data: any) {
    // this.candidateDetails = data;
    const statusUpdate = {
      status: this.updateCandidateStatus,
      remarks: this.comment,
      modifiedBY: 'Ajith',
      _id: this.id,
    };
    this.profileService.editStatus(statusUpdate).subscribe((res) => {
    });
    this.openPopup = false;
    // window.location.reload();
  }
}

//For TableHeading
const tableHeadingsAdmin = [
  // { width: "3%", name: "ID" },
  { width: '17%', name: 'Candidate Name' },
  { width: '15%', name: 'Applied Role' },
  { width: '10%', name: 'Rel Exp' },
  { width: '10%', name: 'N Period' },
  { width: '11%', name: 'CTC' },
  { width: '15%', name: 'Added By' },
  { width: '18%', name: 'Status' },
  { width: '7%', name: '' },
];
