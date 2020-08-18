import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface mydata {
  accesstoken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  usario = {
    username: 'fonaranjo',
    password: '1',
  };

  // httpOptions.headers.set('Authorization', 'my-new-auth-token');
  rootURl = 'http://localhost:8080/api/api-auth';
  getUserDetails(username, password) {
    //post these details to API server return user info if correct
    // return this.http.post(this.rootURl, this.httpOptions);
    //this.http.post(this.rootURl, this.httpOptions);
    this.usario.username = username;
    this.usario.password = password;

    return this.http
      .post<mydata>(this.rootURl, this.usario, this.httpOptions)
      .subscribe((data) => {
        this.router.navigate(['mainmenu']);
        console.log(data.accesstoken);
        //  console.log('khe sad :,(', data);
      });

    // .subscribe((data) => console.log(data, 'is what we got'));
  }
}
