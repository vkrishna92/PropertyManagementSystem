import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Building } from '../Models/Building';
import { PaginationParameters } from '../Models/PaginationParameters';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  baseUrl = environment.baseUrl+"Building/";
  constructor(private http: HttpClient) { }
  get(paginationParams: PaginationParameters){
    const params = new HttpParams()
    .set("PageNumber", paginationParams.PageNumber)
    .set("PageSize",paginationParams.PageSize);
    return this.http.get<Building[]>(this.baseUrl,{params});
  } 
  post(building: Building){
    return this.http.post<Building>(this.baseUrl,building);
  } 
  update(building: Building){
    return this.http.put<Building>(this.baseUrl, building);
  }
  delete(id:number){    
    return this.http.delete<any>(this.baseUrl+id);
  }
}
