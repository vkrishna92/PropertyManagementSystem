import { Component, OnInit } from '@angular/core';
import { faCoffee, faBuilding } from '@fortawesome/free-solid-svg-icons';
import {MegaMenuItem,MenuItem} from 'primeng/api';

@Component({
  selector: 'app-community-setup',
  templateUrl: './community-setup.component.html',
  styleUrls: ['./community-setup.component.css']
})
export class CommunitySetupComponent implements OnInit {

  faBuilding = faBuilding;
  items: MenuItem[];
  
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
