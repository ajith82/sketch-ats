import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private analyticsUrl = '/assets/analytics.json';
  private candidates = '/assets/candidates.json';
  constructor(private http: HttpClient) {}
  BASE_URL = `http://localhost:8000/sketch-one-hr`;
  section: any;
  page: any;
  details(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/posts/', data);
  }

  getDetails() {
    return this.http.get('http://localhost:3000/posts/');
  }

  sendAnalytics(): Observable<any> {
    const url = 'hiring/get/candidate/analytics';
    return this.http.get(this.analyticsUrl);
  }

  getCandidates(): Observable<any> {
    return this.http.get(this.candidates);
  }

  getData(): Observable<any> {
    return this.http.get('http://localhost:3000/profile/');
  }

  IsLoggedIn() {
    return !!localStorage.getItem('id');
  }

  candidateDetails(): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(
      `${this.BASE_URL}/hiring/get/candidate/filter?pageNumber=1&pageSize=10&status=Round 1`,
      { headers: reqHeader }
    );
  }

  googleAuth(): Observable<any> {
    const token = {
      tokenId:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQyNWY4ZGJjZjk3ZGM3ZWM0MDFmMDE3MWZiNmU2YmRhOWVkOWU3OTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2Nzc1NTk5NjgsImF1ZCI6IjkzNDI1NDc4NDQ5MS0ybmVzYWNmOHI0MDN0cjloZGJmcHVsbjlnMzAzbnExMS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMTQwMDM3Mzc3MTI1ODc0ODg4MCIsImhkIjoic2tldGNoYnJhaG1hLmNvbSIsImVtYWlsIjoiYWppdGhAc2tldGNoYnJhaG1hLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiI5MzQyNTQ3ODQ0OTEtMm5lc2FjZjhyNDAzdHI5aGRiZnB1bG45ZzMwM25xMTEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoiQWppdGggViBDIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eGFWTkduUVQ1elh5cHFnYVRNUmRfakZLcTIxc3oyVUlvRl92SERFPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkFqaXRoIiwiZmFtaWx5X25hbWUiOiJWIEMiLCJpYXQiOjE2Nzc1NjAyNjgsImV4cCI6MTY3NzU2Mzg2OCwianRpIjoiZTQ4ZjM5MzE2ODE5NGFkMTRhY2Y2NzE0ODM4ZGI4YWQyYWZkMjE4ZiJ9.QcscrBOlzy4KAKCEst_SxF9r_drmiOUpFewQ-gj0sGLGrbGabYOTM0PvbiZrHBazeAlxvjlhSvnMUSVYZvXpjKLrJnSNRRoYaZT0HmQNcVF2-Iev3GbaBwHC2Z1vMthOtpCYS-AdCcmsfL_o5re_ks-YthlsnSkyUknDJwols5z_g680LrFTWNxj_pyrV0EEWa-yWxQ3X23kva829gudULD8QceM-cdEuY4ME5zzX8lOAxXh592_ofk0eU4C6jzwpg90FrFzXd9fw36ft3UgT_DNotSt-Dh7amh-kt_WqxX_udVHrqCO2UdEkwuRGUSHfoRXp7Gty4x5x_LFiZSclQ',
    };
    return this.http.post('http://localhost:8000/google/login', token);
  }

  getCandidate(candidate: any): Observable<any> {
    console.log('serverrrr', candidate);
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    console.log('serverr page', this.page);
    this.section = candidate;
    return this.http.get(
      `${this.BASE_URL}/hiring/get/candidate/filter?pageNumber=${this.page}&pageSize=10&status=${candidate}`,
      { headers: reqHeader }
    );
  }

  paginate(page: number): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    console.log('serverrrrrrrrr page', page, this.section);
    this.page = page;
    return this.http.get(
      `${this.BASE_URL}/hiring/get/candidate/filter?pageNumber=${page}&pageSize=10&status=${this.section}`,
      { headers: reqHeader }
    );
  }

  search(value:any):Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(
      `${this.BASE_URL}/hiring/get/candidate/search?pageNumber=1&pageSize=10&query=${value}`,
      { headers: reqHeader }
    );
  }

  candidateDashboard():Observable<any>{
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(
      `${this.BASE_URL}/hiring/get/candidate/analytics`,
      { headers: reqHeader }
    );
  }

  offerAccepted():Observable<any>{
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(
      `${this.BASE_URL}/get/candidates/offerAccepted`,
      { headers: reqHeader }
    );
  }

  addCandidate(data:any, res:any,skill:any):Observable<any>{
    console.log("diffff",skill);
    let resume = res;
    let skillSet = skill;
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    console.log("data in server",data);
    // let sendDate = JSON.stringify(data);
    // let params = new HttpParams().set('sendDate', JSON.stringify(data));
    let fd = new FormData();
    let map = Object.keys(data).map((key) => {
      fd.append(key,data[key])
    })
    fd.append('resume',resume)
    fd.append('skillSet',JSON.stringify(skillSet))
    
    // fd.append("educationInfo",JSON.stringify(edu));
    // fd.append("experienceInfo",JSON.stringify(exp));

    
    return this.http.post(
      `${this.BASE_URL}/hiring/add/candidates`,fd,
      { 
        headers: reqHeader,
      }
    );
  }

}
