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
  resumeUrl:any;
  secureLink:any;
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
    this.router.navigate(['candiadte'], { queryParams: { page: newPage } });
  }

  resumeClick(candidate: any) {
    // console.log("sssssssssssssssssssssss",candidate.resume);
    // this.showSidenav = true;
    // this.selectedCandidate = candidate;
    // console.log("resumeee", this.selectedCandidate);
    this.selectedCandidate = candidate;
    this.sidenavOpen = true;
    this.resumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedCandidate?.resume);
    this.secureLink = `https://docs.google.com/gview?url=${this.resumeUrl}&embedded=true`
  }

  closeSidenav() {
    this.sidenavOpen = false;
  }
}
