import { Apartment } from "./Apartment";
import { AppUserDto } from "./AppUser";
import { BaseModel } from "./BaseModel";

export interface MaintenanceAgreement extends BaseModel{
  AppUserId:string,
  AppUser: AppUserDto | null,
  ApartmentId: number,
  Apartment: Apartment | null,
  FromDate:Date,
  ToDate: Date,
  MaintenanceAmount:number,
  IsDisabled: boolean
}
