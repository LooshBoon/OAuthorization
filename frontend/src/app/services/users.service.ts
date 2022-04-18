import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Service that handles all the frontend to backend communication for the USERS table

const baseUrl = 'http://localhost:9000/api/ESPL';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }




  getOne(user_id): Observable<any> {
    return this.http.get(`${baseUrl}/${user_id}`);
  }


}
