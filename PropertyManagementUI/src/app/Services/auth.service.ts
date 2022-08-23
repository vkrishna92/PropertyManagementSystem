import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../Models/Login';
import { BehaviorSubject, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { Tokens } from '../Models/Tokens';
import { Register } from '../Models/Register';
import { AppUserDto } from '../Models/AppUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl+"Auth/";
  jwtHelper = new JwtHelperService();
  decodedToken:string;
  public display_name$ = new BehaviorSubject<string>('');
  public loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient,
              private router:Router) { }

  login(userlogin:Login){    
    return this.http.post<Tokens>(this.baseUrl+"login",userlogin); 
  }
  register(register:Register){
    return this.http.post<any>(this.baseUrl+"register",register);
  }
  logout(){
    localStorage.removeItem('access_token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);    
  }  
  IsLoginValid(){
    const token = localStorage.getItem('access_token');
    console
    if(token != null){       
      return !this.jwtHelper.isTokenExpired(token);
    }
    else{
      return false;
    }    
  }
  getAttributeValue(key:string){
    const token = localStorage.getItem('access_token');
    var tmpToken = this.jwtHelper.decodeToken(token);
    return tmpToken[key];
  }

  getUserByEmail(email:string){
    return this.http.get<AppUserDto>(this.baseUrl+"getUserByEmail/"+email);
  }

}
