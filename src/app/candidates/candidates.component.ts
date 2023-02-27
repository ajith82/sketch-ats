import { ProfileService } from './../profile.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

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
  selectedCandidate: any;
  sidenavOpen: boolean = false;
  resumeUrl: any;
  secureLink: any;
  candidateIndo: any[] = [];
  serachValue:any;

  NoticePeriodArr = [
    "15 Days",
    "30 Days",
    "45 Days",
    "60 Days",
    "90 Days",
    "Immediate joiner"
  ];

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

  candidateSkillSetsArr = [
    "UI UX Design",
    "Lead Generation",
    "Motion Graphics Designer",
    "React Js",
    "Angular Js",
    "Vue Js",
    "React Native",
    "Flutter",
    "Node Js",
    "UI Development",
    "GO Lang",
    "Python",
    "Ruby on Rails",
    "Software Tester",
    "Devops"
  ];

  interviewedByArr = [
    "Sketchbrahma Technologies",
    "Lakshmi Narasimhan Kumar",
    "Bharathi B",
    "Sahana Patil",
    "Shivakumar Swain"
  ];

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
        console.log('pageeeee', page);
      });
  }

  ngOnInit(): void {
    this.profileService.candidateDetails().subscribe((res) => {
      let storage = localStorage.getItem('token');
      this.candidateIndo = res.data.searchResults;
      console.log('respond', this.candidateIndo);

      this.candidateDetails = res.data.getCandidates;
      this.dataSourceWithPageSize = new MatTableDataSource(
        this.candidateDetails
      );
      this.dataSource = new MatTableDataSource(this.candidateDetails);
      this.length = res.data.totalCount;
      console.log('detailsssssss', this.candidateDetails);      
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
  }

  gty(newPage: number) {
    console.log(newPage);
    this.page = newPage;
    this.profileService.paginate(newPage).subscribe((res) => {
      console.log('paginatee', res);
      this.candidateIndo = res.data.searchResults;
    });
    this.router.navigate(['candiadte'], { queryParams: { page: newPage } });
  }

  resumeClick(candidate: any) {
    // console.log("sssssssssssssssssssssss",candidate.resume);
    // this.showSidenav = true;
    // this.selectedCandidate = candidate;
    // console.log("resumeee", this.selectedCandidate);
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
    console.log('aaaaaaaaaaaaaa', this.candidateStatusCustom[id].api);
    this.profileService
      .getCandidate(this.candidateStatusCustom[id].api)
      .subscribe((res) => {
        this.config.totalItems = res.data.totalCount;
        this.candidateIndo = res.data.searchResults;
        console.log('from serverrrr', this.config.totalItems);
      });
  }

  search(value:any){
    console.log(value);
    this.profileService.search(value).subscribe((res) => {
      console.log(res);
      this.candidateIndo = res.data.searchResults;
    })
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
