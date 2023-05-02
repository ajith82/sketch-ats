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
  isEdit = false;
  popupHeading = "Edit User";
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
    this.editPopup = true;
    this.editAdminDetails = data;
  }

  closePopup() {
    this.editPopup = false;
  }

  updateAdmin() {
    if (this.isEdit) {
      this.profileService.editAdmin(this.editAdminDetails).subscribe((res) => {
        this.editPopup = false;
      });
    } else {
      this.popupHeading = "Add User";
      this.profileService.addAdmin(this.editAdminDetails).subscribe((res) => {
        // this.editPopup = false;
      });
    }
  }

  // openEditPopup(admin:any) {    
  //   this.editAdminDetails = {
  //     name: admin.name,
  //     email: admin.email,
  //     role: admin.role
  //   };
  //   this.isEdit = true;
  //   this.editPopup = true;
  // }

  openAddPopup() {
    this.editAdminDetails = {
      name: '',
      email: '',
      role: ''
    };    
    this.isEdit = false;
    this.editPopup = true;
  }

  addAdmin() {
    console.log(this.editAdminDetails );
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
