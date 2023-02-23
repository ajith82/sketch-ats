import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private analyticsUrl = '/assets/analytics.json'
  private candidates = '/assets/candidates.json'
  constructor(private http: HttpClient) { }



  details(data:any):Observable<any>{
    return this.http.post('http://localhost:3000/posts/', data);
  }

  getDetails(){
    return this.http.get('http://localhost:3000/posts/');
  }

  sendAnalytics(): Observable<any> {
    const url = 'hiring/get/candidate/analytics';
    return this.http.get(this.analyticsUrl);
  }

  getCandidates():Observable<any> {
    return this.http.get(this.candidates);
  }

  getData():Observable<any>{
    return this.http.get('http://localhost:3000/profile/')
  }

  IsLoggedIn(){
    return !!localStorage.getItem("id");
  }

  candidateDetails():Observable<any> {
    return this.http.get('http://localhost:3000/comments')
  }
}
