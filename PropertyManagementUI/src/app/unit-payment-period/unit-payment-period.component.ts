import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { MenuItem } from 'primeng/api';
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
  displayModal = false;
  apartmentId = 0;
  public columnDefs: ColDef[] = [
    { field: 'periodStart'},
    { field: 'periodEnd'},
    { field: 'amount' },
    {field:'dueDate'},
    {field:'status'},
    {field:'transactionDate'}
  ];

  constructor(private route:ActivatedRoute,private apartmentService:ApartmentService) {

   }

  ngOnInit(): void {
    this.apartmentId = Number(this.route.snapshot.paramMap.get('id'))
    this.apartmentService.getMaintenanceAgreementByApartmentId(this.apartmentId).subscribe({
      next:(resp)=>{
        this.maintenanceAgreement = resp;
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
        label: 'Edit', icon: 'pi pi-fw pi-pencil',
      },
      {
        label: 'Delete', icon: 'pi pi-fw pi-trash',
      },
      {
        label:'Agreement', icon:'pi pi-fw pi-file', command:(e)=>this.displayModal = !this.displayModal
      }
    ]
  }

  //menu events
  clickNew(){
    console.log("Click new");
  }

}
