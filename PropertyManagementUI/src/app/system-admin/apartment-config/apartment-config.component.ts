import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Apartment } from 'src/app/Models/Apartment';
import { Building } from 'src/app/Models/Building';
import { PaginationParameters } from 'src/app/Models/PaginationParameters';
import { BuildingService } from 'src/app/Services/building.service';

@Component({
  selector: 'app-apartment-config',
  templateUrl: './apartment-config.component.html',
  styleUrls: ['./apartment-config.component.css']
})
export class ApartmentConfigComponent implements OnInit {

  items: MenuItem[];

  //DataSource
  apartments: Apartment[];
  selectedApartment: Apartment;
  buildings: Building[];
  floors:string[];

  //Pagination Params
  pagination : PaginationParameters = {PageNumber:1, PageSize: 20};

  //FORM
  apartmentForm = new FormGroup({
    id: new FormControl(0),
    apartmentNum: new FormControl('',[Validators.required]),
    floor: new FormControl(''),
    areaSqft: new FormControl(0),
    appUserId: new FormControl(''),
    buildingId: new FormControl(0)
  })

  constructor(private buildingService: BuildingService) { 
    this.items = [
      { label: 'New', icon: 'pi pi-fw pi-plus', command: (event)=>{this.clickNew();}},
      { label: 'Save', icon: 'pi pi-fw pi-save', command: (event)=>{this.clickSave()}},      
      { label: 'Delete', icon: 'pi pi-fw pi-trash', command: (event)=>{this.clickDelete()}}  
    ]; 
  }

  ngOnInit(): void {
    this.getBuildings();
    this.getFloors();

  }

  //LOADING DATA
  getBuildings(){
    this.buildingService.get(this.pagination).subscribe({
      next:(r)=>{
        this.buildings = r;                      
      }
    })
  }
  getFloors(){
    for (let index = 0; index < 30; index++) {      
      this.floors.push("Floor "+index);
    }
  }
  searchFloor(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side 
    console.log(event.query);
    this.floors = this.floors.filter(x=>x.startsWith(event.query));
  }

  //TOOLBAR ACTIONS
  clickNew(){

  }
  clickSave(){

  }
  clickDelete(){

  }
  selectApartment(){

  }

}
