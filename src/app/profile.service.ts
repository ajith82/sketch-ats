import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  candId: any;
  currentJobTitle: any;
  filterNoticePeriod: any;
  filterSource: any;
  filterAddedBy: any;
  private stringSubject = new BehaviorSubject<string>('');

  setString(data: string) {
    this.stringSubject.next(data);
  }

  getString() {
    return this.stringSubject.asObservable();
  }

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
      `${this.BASE_URL}/hiring/get/candidate/filter?pageNumber=1&pageSize=10&status=Candidates`,
      { headers: reqHeader }
    );
  }

  googleAuth(): Observable<any> {
    const token = {
      tokenId:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWE1ZWY1YjEyNjIzYzkxNjcxYTcwOTNjYjMyMzMzM2NkMDdkMDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODQ4MjQ5NzQsImF1ZCI6IjkzNDI1NDc4NDQ5MS0ybmVzYWNmOHI0MDN0cjloZGJmcHVsbjlnMzAzbnExMS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMTQwMDM3Mzc3MTI1ODc0ODg4MCIsImhkIjoic2tldGNoYnJhaG1hLmNvbSIsImVtYWlsIjoiYWppdGhAc2tldGNoYnJhaG1hLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiI5MzQyNTQ3ODQ0OTEtMm5lc2FjZjhyNDAzdHI5aGRiZnB1bG45ZzMwM25xMTEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoiQWppdGggViBDIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eGFWTkduUVQ1elh5cHFnYVRNUmRfakZLcTIxc3oyVUlvRl92SERFPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkFqaXRoIiwiZmFtaWx5X25hbWUiOiJWIEMiLCJpYXQiOjE2ODQ4MjUyNzQsImV4cCI6MTY4NDgyODg3NCwianRpIjoiODkyNDkyOTcyMzE0OTM5NWRhZTlmYzE4M2U0MjYyNjg2NTg0MDY2NSJ9.CEXFCQhaMyhwQhzoOEfQkNA4Ubu5d-3KdI5dqWnXh6IgU2_z-I_HaU5rWHewStisxn6Vb0B9Iu3n2xH9-9vXQuz3r1k1HshgKrMK2zqG8j2Wt3EKT8TrlgqWvhTXgPcsytvgk630mbRx_Sk6cM93PI9ZLUa-fr5BtlyHFcY7mtVhjew0tr0o3GedNa0OHCXcHUr_YpNzxyAV9KTv3ii74RDcrIQKzdYBi5GW6k4tqeYLDFtrb49PxI6ISgJqWqczsAC67I66fR5A3mXm-ic4kkbg64lbqt6ZQAuJO9zMzwDEqmosF2dHq92dTrFe6vv0LOndjpJbI4HlB6elLgbK1w',
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

  search(value: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(
      `${this.BASE_URL}/hiring/get/candidate/search?pageNumber=1&pageSize=10&query=${value}`,
      { headers: reqHeader }
    );
  }

  candidateDashboard(): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(`${this.BASE_URL}/hiring/get/candidate/analytics`, {
      headers: reqHeader,
    });
  }

  offerAccepted(): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(`${this.BASE_URL}/get/candidates/offerAccepted`, {
      headers: reqHeader,
    });
  }

  addCandidate(
    data: any,
    res: any,
    skill: any,
    edu: any,
    exp: any
  ): Observable<any> {
    console.log('diffff', skill);
    let resume = res;
    let skillSet = skill;
    let eduArr = edu;
    let expArr = exp;
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    console.log('data in server', data);
    // let sendDate = JSON.stringify(data);
    // let params = new HttpParams().set('sendDate', JSON.stringify(data));
    let fd = new FormData();
    let map = Object.keys(data).map((key) => {
      fd.append(key, data[key]);
    });
    fd.append('resume', resume);
    fd.append('skillSet', JSON.stringify(skillSet));
    fd.append('educationInfo', JSON.stringify(eduArr));
    fd.append('experienceInfo', JSON.stringify(expArr));

    // fd.append("educationInfo",JSON.stringify(edu));
    // fd.append("experienceInfo",JSON.stringify(exp));

    return this.http.post(`${this.BASE_URL}/hiring/add/candidates`, fd, {
      headers: reqHeader,
    });
  }

  getCandidateDetails(id: any): Observable<any> {
    console.log('candidateId:', id);
    this.candId = id;
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(`${this.BASE_URL}/hiring/get/candidate?_id=${id}`, {
      headers: reqHeader,
    });
  }

  pipeLine(id: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(
      `${this.BASE_URL}/hiring/get/candidate/status?_id=${id}`,
      {
        headers: reqHeader,
      }
    );
  }

  getCandDetails(): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(
      `${this.BASE_URL}/hiring/get/candidate?_id=${this.candId}`,
      { headers: reqHeader }
    );
  }

  editCandidate(data: any,eduArr:any): Observable<any> {
    console.log(data.skillSet);

    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    let fd = new FormData();
    let map = Object.keys(data).map((key) => {
      if (
        key !== 'modifiedBY' &&
        key !== 'modifiedDate' &&
        key !== '__v' &&
        key !== 'candidateStatus' &&
        key !== 'resume' &&
        key !== 'expectedJoiningDate'
      ) {
        if (key === 'skillSet' || key === 'educationInfo' || key === 'experienceInfo') {
          fd.append(key, JSON.stringify(data[key]));
        } else {
          fd.append(key, data[key]);
        }
      }
    });
    // fd.append('skillSet',JSON.stringify(data.skillSet))
    return this.http.put(`${this.BASE_URL}/hiring/update/candidates`, fd, {
      headers: reqHeader,
    });
  }

  jobOpening(data: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    this.currentJobTitle = data;
    const encodedJobTitle = encodeURIComponent(data.currentJobTitle);
    let fd = new FormData();
    const currentJobValue = data.replace(' ', '+');
    return this.http.get(
      `${this.BASE_URL}/hiring/get/candidate/filter?pageNumber=${this.page}&pageSize=10&currentJobTitle=${currentJobValue}&status=Candidates`,
      {
        headers: reqHeader,
      }
    );
  }

  noticePeriod(data: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    console.log('serrrrrrrrrrr', data);
    this.filterNoticePeriod = data;
    let fd = new FormData();
    const noticePeriodValue = data.replace(' ', '+');
    return this.http.get(
      `${this.BASE_URL}/hiring/get/candidate/filter?pageNumber=${this.page}&pageSize=10&noticePeriod=${noticePeriodValue}&status=Candidates`,
      {
        headers: reqHeader,
      }
    );
  }

  source(data: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    console.log(data);
    this.filterSource = data;
    let fd = new FormData();
    const sourceValue = data.replace(' ', '+');
    return this.http.get(
      `${this.BASE_URL}/hiring/get/candidate/filter?pageNumber=${this.page}&pageSize=10&source=${sourceValue}&status=Candidates`,
      {
        headers: reqHeader,
      }
    );
  }

  addedBy(data: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    console.log(data);
    this.filterAddedBy = data;
    let fd = new FormData();
    const addedByValue = data.replace(' ', '+');
    return this.http.get(
      `${this.BASE_URL}/hiring/get/candidate/filter?pageNumber=${this.page}&pageSize=10&interviewBy=${addedByValue}&status=Candidates`,
      {
        headers: reqHeader,
      }
    );
  }

  getAdmins(): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(
      `${this.BASE_URL}/getAllUser?pageNumber=1&pageSize=100`,
      {
        headers: reqHeader,
      }
    );
  }

  editAdmin(data: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.put(`${this.BASE_URL}/update/user`, data, {
      headers: reqHeader,
    });
  }

  addAdmin(data: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(`${this.BASE_URL}/create/user`, data, {
      headers: reqHeader,
    });
  }

  deleteRole(id: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.delete(`${this.BASE_URL}/delete/user?_id=${id}`, {
      headers: reqHeader,
    });
  }

  statusUpdate(data: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.put(
      `${this.BASE_URL}/hiring/candidate/updateStatus`,
      data,
      {
        headers: reqHeader,
      }
    );
  }

  afterUpdate(id: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(
      `${this.BASE_URL}/hiring/get/candidate/status?_id=${id}`,
      {
        headers: reqHeader,
      }
    );
  }

  dashFilter(data: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(
      `${this.BASE_URL}/get/candidates/offerAccepted?currentJobTitle=${data}`,
      {
        headers: reqHeader,
      }
    );
  }

  dashCandDetails(id: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    this.candId = id;
    return this.http.get(`${this.BASE_URL}/hiring/get/candidate?_id=${id}`, {
      headers: reqHeader,
    });
  }

  editStatus(data: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.put(
      `${this.BASE_URL}/hiring/candidate/updateStatus`,
      data,
      {
        headers: reqHeader,
      }
    );
  }

  deleteStatus(candId: any, statusId: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.delete(
      `${this.BASE_URL}/hiring/candidate/deletestatus?_id=${statusId}&candidateId=${candId}`,
      {
        headers: reqHeader,
      }
    );
  }
}
