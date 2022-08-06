import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../Models/Login';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { Tokens } from '../Models/Tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl+"Auth/";
  jwtHelper = new JwtHelperService();
  decodedToken:string;
  constructor(private http: HttpClient,
              private router:Router) { }

  login(userlogin:Login){    
    return this.http.post<Tokens>(this.baseUrl+"login",userlogin); 
  }
  logout(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);    
  }
  IsLoginValid(){
    const token = localStorage.getItem('access_token');
    console
    if(token != null){
      return this.jwtHelper.isTokenExpired(token);
    }
    else{
      return false;
    }    
  }

}
