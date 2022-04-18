import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Service that handles all the frontend to backend communication for the USERS table

const baseUrl = 'http://localhost:9000/api/steam';
const baseURL = 'http://localhost:9000/api/bnet';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private http: HttpClient) { }




  getOne(oauth_id): Observable<any> {
    return this.http.get(`${baseUrl}/${oauth_id}`);
  }


  updateStatus(oauth_id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${oauth_id}`, data);
  }

  updateBattlenetStatus(oauth_id, data): Observable<any> {
    return this.http.put(`${baseURL}/${oauth_id}`, data);
  }

}
