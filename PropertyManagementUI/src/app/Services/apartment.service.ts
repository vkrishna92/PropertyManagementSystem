import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Apartment } from '../Models/Apartment';
import { PaginationParameters } from '../Models/PaginationParameters';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  baseUrl = environment.baseUrl+"Apartment/";
  constructor(private http: HttpClient) { }  
  getAll(paginationParam: PaginationParameters){
    const params = new HttpParams()
    .set('PageNumber',paginationParam.PageNumber)
    .set('PageSize',paginationParam.PageSize);
    return this.http.get<Apartment[]>(this.baseUrl, {params});
  }

  get(id:number){
    return this.http.get<Apartment>(this.baseUrl);
  }
  post(apartment:Apartment){
    return this.http.post<Apartment>(this.baseUrl,apartment);
  }
  update(apartment:Apartment){
    return this.http.put<Apartment>(this.baseUrl,apartment);
  }
  delete(id:number){
    return this.http.delete<any>(this.baseUrl+id);
  }

}
