import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { MaintenanceAgreement } from '../Models/MaintenanceAgreement';
import { MaintenanceSchedule } from '../Models/MaintenanceSchedule';
import { ApartmentService } from '../Services/apartment.service';

@Component({
  selector: 'app-unit-payment-period',
  templateUrl: './unit-payment-period.component.html',
  styleUrls: ['./unit-payment-period.component.css']
})
export class UnitPaymentPeriodComponent implements OnInit {

  items: MenuItem[];
  maintenanceScheduleList:  MaintenanceSchedule[];
  maintenanceAgreement: MaintenanceAgreement;
  selectedPeriod: MaintenanceSchedule;

  apartmentId = 0;
  public columnDefs: ColDef[] = [
    { field: 'PeriodStartDate'},
    { field: 'PeriodEndDate'},
    { field: 'MaintenanceAmount' },
    {field:'TransDate'},
    {field:'Status'}
  ];

  constructor(private route:ActivatedRoute,private apartmentService:ApartmentService,
    private confirmationService: ConfirmationService, private messageService: MessageService) {

   }

  ngOnInit(): void {
    this.apartmentId = Number(this.route.snapshot.paramMap.get('id'))
    this.apartmentService.getMaintenanceAgreementByApartmentId(this.apartmentId).subscribe({
      next:(resp)=>{
        this.maintenanceAgreement = resp;
        if(this.maintenanceAgreement.Id != 0){
          this.apartmentService.getMaintenanceSchedulesByAgreementId(this.maintenanceAgreement.Id).subscribe({
            next:(resp)=>{
              this.maintenanceScheduleList = resp;
            }
          })
        }
      }
    })
    this.items = [
      {
        label: 'New', icon: 'pi pi-fw pi-plus', command:(e)=> this.clickNew()
      },
      {
        label: 'Save', icon: 'pi pi-fw pi-save',
      },
      {
        label: 'Edit', icon: 'pi pi-fw pi-pencil', command: (e)=> this.clickEdit()
      },
      {
        label: 'Delete', icon: 'pi pi-fw pi-trash',
      }
    ]
  }

  //menu events
  clickNew(){
    console.log("Click new");
  }
  clickEdit(){
    console.log(this.selectedPeriod);
  }



}
