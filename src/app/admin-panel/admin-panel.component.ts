import { Component, Inject, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    public dialog: MatDialog
  ) {}
  adminDetails: any;
  editPopup = false;
  editAdminDetails:any;
  adminRoles = [
    "Admin",
    "Manager",
    "Recruiters",
    "Interviewers",
    "Users"
  ]

  ngOnInit(): void {
    this.profileService.getAdmins().subscribe((res) => {
      console.log('resssssssssssssssssz', res);
      this.adminDetails = res;
      console.log("rrrrrrrrrr",res.data.user);
    });
  }
  openDialog(data:any) {
    // console.log("aaaaaaaaaa",data);
    
    // const dialogRef = this.dialog.open(DialogContentExampleDialog, {
    //   height: '480px',
    //   width: '350px',
    //   data: {
    //     animal: 'panda',
    //   },
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed', result);
    // });
  }

  openPopup(data:any) {
    console.log(data);
    this.editPopup = true;
    this.editAdminDetails = data;
  }

  closePopup() {
    this.editPopup = false;
  }

  updateAdmin() {
    this.profileService.editAdmin(this.editAdminDetails).subscribe((res) => {
      console.log("gottttt",res);
      this.editPopup = false;
    })  
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
  public dialogRef: MatDialogRef<DialogContentExampleDialog>) {
    console.log("hhhhhhhhhhhhhhhhhhhh");
  }
}
