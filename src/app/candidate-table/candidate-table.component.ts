import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-candidate-table',
  templateUrl: './candidate-table.component.html',
  styleUrls: ['./candidate-table.component.css'],
})
export class CandidateTableComponent implements OnInit {
  @Input() candidateData: any = '';
  @Input() hideChipsFilter = true;
  config: any;
  sidenavOpen: boolean = false;
  sidenavOpenStatus:boolean = false;
  page: number = 1;
  resumeUrl: any;
  selectedCandidate: any;
  secureLink: any;
  selectedIndex = 0;
  openPopup = false;
  updateCandidateStatus: any;
  comment: any;
  id: any;

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

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute,
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
  }

  candidatesDetails(id: any) {
    this.profileService.getCandidateDetails(id).subscribe((res) => {
    });
    this.router.navigate(['details']);
  }

  resumeClick(candidate: any) {
    this.selectedCandidate = candidate;
    this.sidenavOpen = true;
    this.resumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.selectedCandidate?.resume
    );
    this.secureLink = `https://docs.google.com/gview?url=${this.resumeUrl}&embedded=true`;
  }

  candStatus(id: any) {
    this.selectedIndex = id;
    // this.page = 1;
    this.profileService
      .getCandidate(this.candidateStatusCustom[id].api)
      .subscribe((res) => {
        this.config.totalItems = res.data.totalCount;
        this.candidateData = res.data.searchResults;
        window.sessionStorage.setItem('selectedIndex', id.toString());
        window.sessionStorage.setItem(
          'candidateInfo',
          JSON.stringify(this.candidateData)
        );
      });
  }

  closeSidenav() {
    this.sidenavOpen = false;
  }

  getCandDetails(data: any) {
    this.sidenavOpenStatus = true;
    this.openPopup = true;
    this.id = data._id;
  }

  closePopup() {
    this.openPopup = false;
  }

  updateStatus(data: any) {
    const statusUpdate = {
      status: this.updateCandidateStatus,
      remarks: this.comment,
      modifiedBY: 'Ajith',
      _id: this.id,
    };
    this.profileService.editStatus(statusUpdate).subscribe((res) => {
    });
    this.openPopup = false;
  }

  gty(newPage: number) {
    this.page = newPage;
    this.profileService.paginate(newPage).subscribe((res) => {
      this.candidateData = res.data.searchResults;
    });
    this.router.navigate(['candiadte'], { queryParams: { page: newPage } });
  }
}
