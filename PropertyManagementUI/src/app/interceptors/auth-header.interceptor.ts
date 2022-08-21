import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('access_token');
    if(token){
      request = request.clone({
        setHeaders: { Authorization : `Bearer ${token}`}
      });
    }
    return next.handle(request);
  }
}
