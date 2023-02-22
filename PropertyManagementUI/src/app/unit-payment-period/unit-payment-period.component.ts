import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-unit-payment-period',
  templateUrl: './unit-payment-period.component.html',
  styleUrls: ['./unit-payment-period.component.css']
})
export class UnitPaymentPeriodComponent implements OnInit {

  items: MenuItem[];
  public columnDefs: ColDef[] = [
    { field: 'periodStart'},
    { field: 'periodEnd'},
    { field: 'amount' },
    {field:'dueDate'},
    {field:'status'},
    {field:'transactionDate'}
  ];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'New', icon: 'pi pi-fw pi-plus',
      },
      {
        label: 'Save', icon: 'pi pi-fw pi-save',
      },
      {
        label: 'Edit', icon: 'pi pi-fw pi-pencil',
      },
      {
        label: 'Delte', icon: 'pi pi-fw pi-trash',
      }
    ]
  }

}
