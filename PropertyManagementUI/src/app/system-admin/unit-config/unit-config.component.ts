import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-unit-config',
  templateUrl: './unit-config.component.html',
  styleUrls: ['./unit-config.component.css']
})
export class UnitConfigComponent implements OnInit {

  items: MenuItem[];
  units: string[];
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
    ];
    this.units = ['Flat No: 1001','Flat No: 1002','Flat No: 1003','Flat No: 1004', 'Flat No: 1005','Flat No: 1006','Flat No: 1007']
  }

}
