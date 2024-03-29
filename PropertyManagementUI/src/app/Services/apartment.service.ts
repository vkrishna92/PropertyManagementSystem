import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Apartment } from '../Models/Apartment';
import { MaintenanceAgreement } from '../Models/MaintenanceAgreement';
import { MaintenanceSchedule } from '../Models/MaintenanceSchedule';
import { PaginationParameters } from '../Models/PaginationParameters';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  baseUrl = environment.baseUrl+"Apartment/";
  constructor(private http: HttpClient) { }

  //Apartment APIs
  getAll(paginationParam: PaginationParameters){
    const params = new HttpParams()
    .set('PageNumber',paginationParam.PageNumber)
    .set('PageSize',paginationParam.PageSize);
    return this.http.get<Apartment[]>(this.baseUrl, {params});
  }

  get(id:number){
    return this.http.get<Apartment>(this.baseUrl+id);
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
  getMyUnits(){
    return this.http.get<Apartment[]>(this.baseUrl+"myUnits");
  }

  //Maintenance Agreement APIs
  postMaintenanceAgreement(maintenanceAgreement: MaintenanceAgreement){
    return this.http.post<MaintenanceAgreement>(this.baseUrl+"maintenance-agreement", maintenanceAgreement);
  }

  updateMaintenanceAgreement(maintenanceAgreement: MaintenanceAgreement){
    return this.http.put<MaintenanceAgreement>(this.baseUrl+"maintenance-agreement", maintenanceAgreement);
  }

  deleteMaintenanceAgreement(id: number){
    return this.http.delete<any>(this.baseUrl+"maintenance-agreement/"+id);
  }

  getMaintenanceAgreementByApartmentId(id: number){
    return this.http.get<MaintenanceAgreement>(this.baseUrl+"maintenance-agreement-apartmentId/"+id);
  }

  //schedules
  getMaintenanceSchedulesByAgreementId(id:number){
    return this.http.get<MaintenanceSchedule[]>(this.baseUrl+"maintenance-agreement-schedule/"+id);
  }

}
