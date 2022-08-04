import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../Models/Login';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;
  jwtHelper = new JwtHelperService();
  decodedToken:any;
  constructor(private http: HttpClient,
              private router:Router) { }

  login(userlogin:any){
    console.log(userlogin);
    return this.http.post(this.baseUrl+"login",userlogin).pipe(
      map((response:any)=>{
        const user = response;
        //AppConstants.userProfile=user;
        if(user){
          localStorage.setItem("token",user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
  )}
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    //this.alert.success("Logout","successful")
  }
  IsLoginValid(){
    const token = localStorage.getItem('token');
    if(token != null){
      return this.jwtHelper.isTokenExpired(token);
    }
    else{
      return false;
    }    
  }

}
