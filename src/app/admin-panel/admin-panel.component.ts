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
  popupHeading = "Edit";
  adminRoles = [
    "Admin",
    "Manager",
    "Recruiters",
    "Interviewers",
    "Users"
  ]

  ngOnInit(): void {
    this.profileService.getAdmins().subscribe((res) => {
      this.adminDetails = res;
    });
  }
  openDialog(data:any) {
    
    // const dialogRef = this.dialog.open(DialogContentExampleDialog, {
    //   height: '480px',
    //   width: '350px',
    //   data: {
    //     animal: 'panda',
    //   },
    // });
    // dialogRef.afterClosed().subscribe((result) => {
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
    if (this.isEdit = true) {
      this.profileService.editAdmin(this.editAdminDetails).subscribe((res) => {
        this.editPopup = false;
      });
      // window.location.reload();
    } else {
      this.profileService.addAdmin(this.editAdminDetails).subscribe((res) => {
        this.editPopup = false;
      });
      // window.location.reload();
    }
  }

  openEditPopup(admin:any) {    
    this.editAdminDetails = {
      name: admin.name,
      email: admin.email,
      role: admin.role
    };
    this.profileService.editAdmin(this.editAdminDetails).subscribe((res) => {
      this.editPopup = false;
    });
    this.isEdit = true;
    this.popupHeading = "Edit";
    this.editPopup = true;
  }

  openAddPopup() {
    this.editAdminDetails = {
      name: '',
      email: '',
      role: ''
    };    
    this.isEdit = false;
    this.popupHeading = "Add";
    this.editPopup = true;
  }

  addAdmin() {
    this.profileService.addAdmin(this.editAdminDetails).subscribe((res) => {
      this.editPopup = false;
    });
    // window.location.reload()
  }

  deleteRole(id:any) {
    this.profileService.deleteRole(id).subscribe((res) => {
    })
    window.location.reload();
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
  public dialogRef: MatDialogRef<DialogContentExampleDialog>) {
  }
}
