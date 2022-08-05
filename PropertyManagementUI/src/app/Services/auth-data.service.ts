import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  jwtHelper = new JwtHelperService();
  decodedToken:string;
  token:string
  constructor() {
    this.token = localStorage.getItem('access_token');
    this.decodedToken = this.jwtHelper.decodeToken(this.token);
  }

  isExpired(){
    return this.jwtHelper.isTokenExpired(this.token);
  }
  getAttributeValue(key:string){
    var tmpToken = this.jwtHelper.decodeToken(this.token);
    return tmpToken[key];
  }
}
