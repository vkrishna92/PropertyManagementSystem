import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Community } from '../Models/Community';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  baseUrl = environment.baseUrl+"Community/";
  constructor(private http: HttpClient) { }

  Get(){
    return this.http.get<Community>(this.baseUrl);
  }
  update(community:Community){
    return this.http.put<Community>(this.baseUrl, community);
  }
 
  
}
