import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import { BuildingService } from 'src/app/Services/building.service';
import { PaginationParameters } from 'src/app/Models/PaginationParameters';
import { Building } from 'src/app/Models/Building';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  //Pagination Params
  pagination : PaginationParameters = {PageNumber:1, PageSize: 20};

  //DataSource
  buildings: Building[];
  selectedBuilding:Building;

  //Forms
  buildingForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('',[Validators.required]),
    useCommunityAddress : new FormControl(false),
    address1 : new FormControl(''),
    address2 : new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country : new FormControl(''),
    zipcode: new FormControl('')
  });
  useCommunityAddress = false;

  constructor(private buildingService: BuildingService, private messageService: MessageService) {
    this.getBuildings();
  }

  ngOnInit(): void {
    this.height = screen.height;
    this.width = screen.width;

    this.items = [
      { label: 'New', icon: 'pi pi-fw pi-plus', command: (event)=>{this.clickNew();}},
      { label: 'Save', icon: 'pi pi-fw pi-save', command: (event)=>{this.clickSave()}},
      { label: 'Delete', icon: 'pi pi-fw pi-trash', command: (event)=>{this.clickDelete()}}
    ];
  }

  getBuildings(){
    this.buildingService.get(this.pagination).subscribe({
      next:(r)=>{
        this.buildings = r;
        if(this.buildings.length > 0){
          //set form
          this.setBuildingForm(this.buildings[0]);
        }
      }
    })
  }

  setBuildingForm(building:Building){
    this.buildingForm.patchValue({
      id: building.Id,
      name: building.Name,
      useCommunityAddress: building.UseCommunityAddress,
      address1: building.AddressLine1,
      address2: building.AddressLine2,
      city: building.City,
      state: building.State,
      country: building.Country,
      zipcode: building.Zipcode
    })
  }

  //TOOLBAR ACTIONS
  clickSave(){
    if(this.buildingForm.touched && this.buildingForm.valid){
      let building: Building =
      {
        Id: this.buildingForm.controls['id'].value,
        Name: this.buildingForm.controls['name'].value,
        UseCommunityAddress: this.buildingForm.controls['useCommunityAddress'].value,
        AddressLine1: this.buildingForm.controls['address1'].value,
        AddressLine2: this.buildingForm.controls['address2'].value,
        City: this.buildingForm.controls['city'].value,
        State: this.buildingForm.controls['state'].value,
        Country: this.buildingForm.controls['country'].value,
        Zipcode: this.buildingForm.controls['zipcode'].value,
        Community: null,
        CommunityId: 0,
        CreatedBy :'',
        CreatedDateTime: new Date(),
        ModifiedBy:'',
        ModifiedDateTime: new Date()
      }
      if(building.Id != 0){
        this.buildingService.update(building).subscribe({
          next:(r)=>{
            this.messageService.add({severity:'success',summary:'Building information updated.'});
          },
          error:(err)=>{
            this.messageService.add({severity:'error',summary:'Unable to update building information.'});
          },
        })
      }
      else{
        this.buildingService.post(building).subscribe({
          next:(r)=>{
            this.messageService.add({severity:'success',summary:'Building information saved.'});
            this.buildingForm.reset();
            this.getBuildings();
          },
          error:(err)=> {
            this.messageService.add({severity:'error',summary:'Unable to save building information.'});
          }
        });
      }
    }
  }
  clickNew(){
    this.buildingForm.reset();
  }
  clickDelete(){
    this.buildingService.delete(this.selectedBuilding.Id).subscribe({
      next:(r)=>{
        this.getBuildings();
        this.messageService.add({severity:'success',summary:'Building information removed.'});
      },
      error:(err)=> {
        this.messageService.add({severity:'error',summary:'Unable to delete building information.'});
      },
    })
  }
  selectBuilding(){
    this.setBuildingForm(this.selectedBuilding);
  }
}


