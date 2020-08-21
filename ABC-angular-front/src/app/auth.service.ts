import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioCorto } from './models/usuario';
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
  usuario: UsuarioCorto = new UsuarioCorto();
  //rootURl = `http://${process.env.IP_BACK}:8080/api/api-auth`;
  //rootURl = 'http://localhost:8080/api/api-auth';
  rootURl = 'http://172.24.98.165:8080/api/api-auth';

  getUserDetails(username, password) {
    this.usuario.username = username;
    this.usuario.password = password;
    return this.http
      .post<mydata>(this.rootURl, this.usuario, this.httpOptions)
      .subscribe(
        (data) => {
          this.router.navigate(['mainmenu']);
          console.log(data.accesstoken);
          localStorage.setItem('token', data.accesstoken);
          //  console.log('khe sad :,(', data);
        },
        (err) => {
          console.log(err);
        }
      );

    // .subscribe((data) => console.log(data, 'is what we got'));
  }
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
