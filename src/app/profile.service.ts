import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }



  details(data:any):Observable<any>{
    return this.http.post('http://localhost:3000/posts/', data);
  }

  getDetails(){
    return this.http.get('http://localhost:3000/posts/');
  }
}
