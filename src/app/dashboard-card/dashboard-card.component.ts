import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css'],
})
export class DashboardCardComponent implements OnInit {
  @Input() item: any = '';
  @Input() title: any = '';

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {}

  dashCandDetails(id: string) {
    this.profileService.dashCandDetails(id).subscribe((res) => {
      this.router.navigate(['details']);
    });
  }
}
