import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { onErrorResumeNext } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(req, nex) {
    const tokenizedrequest = req.clone({
      setHeaders: {
        Authorization: `token ${localStorage.getItem('token')}`,
      },
    });
    return nex.handle(tokenizedrequest);
  }
}
