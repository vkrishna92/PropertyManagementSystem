import { BaseModel } from "./BaseModel";
import { MaintenanceAgreement } from "./MaintenanceAgreement";

export interface MaintenanceSchedule extends BaseModel{
  periodStartDate:Date,
  periodEndDate: Date,
  maintenanceAmount: number,
  status: boolean,
  transDate: Date,
  maintenanceAgreementId: number,
  maintenanceAgreement: MaintenanceAgreement
}
