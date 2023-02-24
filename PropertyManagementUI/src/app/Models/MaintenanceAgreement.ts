import { Apartment } from "./Apartment";
import { AppUserDto } from "./AppUser";
import { BaseModel } from "./BaseModel";

export interface MaintenanceAgreement extends BaseModel{
  AppUserId:string,
  AppUser: AppUserDto,
  ApartmentId: number,
  Apartment: Apartment,
  FromDate:Date,
  ToDate: Date,
  MaintenanceAmount:number
}
