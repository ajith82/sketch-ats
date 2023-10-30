import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-candidate-pipeline',
  templateUrl: './candidate-pipeline.component.html',
  styleUrls: ['./candidate-pipeline.component.css'],
})
export class CandidatePipelineComponent implements OnInit {
  @Input() candidateStatus: any;
  @Input() isCandidate: boolean = false;
  pipeLineBtn = false;
  updateCandidateStatus: any;
  comment: any;
  data: any;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getCandDetails().subscribe((res) => {
      this.data = res.data.getCandidates;
    });
  }

  deleteStatus(data: any) {
    const candidateId = data.candidateId;
    const statusId = data._id;

    this.profileService.deleteStatus(candidateId, statusId).subscribe(() => {
      this.profileService.pipeLine(candidateId).subscribe((res) => {
        this.candidateStatus = res.data.hiringStatus;
      });
    });
  }

  closeStatus() {
    this.isCandidate = false;
  }

  updateStatus() {
    const statusUpdate = {
      status: this.updateCandidateStatus,
      remarks: this.comment,
      modifiedBY: this.data.modifiedBY,
      _id: this.data._id,
    };
    this.profileService.statusUpdate(statusUpdate).subscribe((res) => {
      this.candidateStatus.push(res.data.hiringStatus);
    });
    this.profileService.pipeLine(statusUpdate._id).subscribe((res) => {});
    this.isCandidate = false;
  }
}
