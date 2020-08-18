import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css'],
})
export class MainmenuComponent implements OnInit {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'my-auth-token',
    }),
  };
  ngOnInit(): void {
    // this.httpOptions.headers.set('Authorization', `token ${token}`);
  }
}
