import { Component, OnInit } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-building-config',
  templateUrl: './building-config.component.html',
  styleUrls: ['./building-config.component.css']
})

export class BuildingConfigComponent implements OnInit {

  items: MenuItem[];
  cities: string[];

  //screen variables
  height = 0;
  width = 0;
  constructor() { }

  ngOnInit(): void {
    this.height = screen.height;
    this.width = screen.width;
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
    this.cities = ['Block A','Block B','Block C','Block D', 'Block E','Block F','Block G']
  };
}


