import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {
  MatIconModule,
  MatFormFieldModule,
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MaterialExampleModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AngularPaginatorModule } from 'angular-paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import { LoginBtnComponent } from './login-btn/login-btn.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { DetailsComponent } from './details/details.component';
import {
  AdminPanelComponent,
  DialogContentExampleDialog,
} from './admin-panel/admin-panel.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { CandidateTableComponent } from './candidate-table/candidate-table.component';
import { CandidatePipelineComponent } from './candidate-pipeline/candidate-pipeline.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginAuthComponent,
    LoginBtnComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    CandidatesComponent,
    SidenavComponent,
    AddCandidateComponent,
    CandidateDetailsComponent,
    DetailsComponent,
    AdminPanelComponent,
    DialogContentExampleDialog,
    DashboardCardComponent,
    CandidateTableComponent,
    CandidatePipelineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxDaterangepickerMd.forRoot(),
    MatPaginatorModule,
    AngularPaginatorModule,
    NgxPaginationModule,
    MatSidenavModule,
    MatChipsModule,
    MatDialogModule,
    NgMultiSelectDropDownModule.forRoot()
    // QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
