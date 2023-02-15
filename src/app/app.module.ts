import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { MatIconModule, MatButtonModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MaterialExampleModule } from '../material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import { LoginBtnComponent } from './login-btn/login-btn.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidatesComponent } from './candidates/candidates.component';

const firebaseConfig = {
  apiKey: 'AIzaSyCKl_liexseAYPKW_9tr3FgN2ztobjQLzs',
  authDomain: 'numeric-elixir-377706.firebaseapp.com',
  projectId: 'numeric-elixir-377706',
  storageBucket: 'numeric-elixir-377706.appspot.com',
  messagingSenderId: '1088393497169',
  appId: '1:1088393497169:web:aa34f614eba68c06098670',
  measurementId: 'G-Q0211F5RSY',
};

@NgModule({
  declarations: [
    AppComponent,
    LoginAuthComponent,
    LoginBtnComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    CandidatesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
