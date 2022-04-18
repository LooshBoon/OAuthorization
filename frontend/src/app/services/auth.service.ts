import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//User login and registration service handler

const AUTH_API = 'http://localhost:9000/api/ESPL/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin',
    {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(users): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      email: users.email,
      password: users.password,
      fName: users.fName,
      lName: users.lName,
      birthdate: users.birthdate,
      country: users.country,
      gender: users.gender,

    }, httpOptions);
  }
}
