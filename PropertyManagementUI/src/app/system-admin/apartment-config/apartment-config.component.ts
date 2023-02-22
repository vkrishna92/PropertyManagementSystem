import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { zip } from 'rxjs';
import { Apartment } from 'src/app/Models/Apartment';
import { AppUserDto } from 'src/app/Models/AppUser';
import { Building } from 'src/app/Models/Building';
import { PaginationParameters } from 'src/app/Models/PaginationParameters';
import { ApartmentService } from 'src/app/Services/apartment.service';
import { AuthService } from 'src/app/Services/auth.service';
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
  floors:string[]=[];

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
  });
  ownerInformationForm = new FormGroup({
    id: new FormControl({value:'',disabled:true}),
    firstName: new FormControl({value:'',disabled:true}),
    lastName: new FormControl({value:'',disabled:true}),
    email: new FormControl({value:'',disabled:true}),
    phone: new FormControl({value:'',disabled:true})
  })

  constructor(private buildingService: BuildingService, private apartmentService: ApartmentService, private messageService: MessageService, private auth: AuthService) {
    this.items = [
      { label: 'New', icon: 'pi pi-fw pi-plus', command: (event)=>{this.clickNew();}},
      { label: 'Save', icon: 'pi pi-fw pi-save', command: (event)=>{this.clickSave()}},
      { label: 'Delete', icon: 'pi pi-fw pi-trash', command: (event)=>{this.clickDelete()}}
    ];
  }

  ngOnInit(): void {
    this.getFloors();
    this.getBuildings();
    this.getApartments();
  }

  //LOADING DATA
  getBuildings(){
    this.buildingService.get(this.pagination).subscribe({
      next:(r)=>{
        this.buildings = r;
      }
    })
  }
  getApartments(){
    this.apartmentService.getAll(this.pagination).subscribe({
      next:(value)=> {
          this.apartments = value;
          if(this.apartments.length>0){
            this.setApartmentForm(this.apartments[0])
            let owner = this.apartments[0].Owner;
            this.setOwnerForm(owner);
          }
      },
      error: (err)=> {
          this.messageService.add({severity:'error',summary:'Unable to fetch apartments.', detail:err.message});
      },
    })
  }
  getFloors(){
    this.floors.push("Floor G");
    this.floors.push("Parking 1");
    this.floors.push("Parking 2");
    for (let index = 1; index < 30; index++) {
      this.floors.push("Floor "+index);
    }
  }

  //TOOLBAR ACTIONS
  clickNew(){
    this.apartmentForm.reset();
    this.ownerInformationForm.reset();
    this.apartmentForm.patchValue({
      id:0,
      apartmentNum:'',
      areaSqft:0,
      floor: this.floors[0],
    });
  }
  clickSave(){
    //console.log(this.apartmentForm.value);
    let apartment: Apartment = {
      Id: this.apartmentForm.controls['id'].value,
      ApartmentNum: this.apartmentForm.controls['apartmentNum'].value,
      Floor: this.apartmentForm.controls['floor'].value,
      BuildingId: this.apartmentForm.controls['buildingId'].value,
      AreaSqft:  this.apartmentForm.controls['areaSqft'].value,
      AppUserId: this.ownerInformationForm.controls["id"].value,
      Owner: null,
      Building: null,
      CreatedBy: null,
      CreatedDateTime: new Date(),
      ModifiedBy: null,
      ModifiedDateTime: new Date()
    }
    console.log(apartment);
    if(apartment.Id == 0){
      this.apartmentService.post(apartment).subscribe({
        next:(value)=> {
            this.messageService.add({severity:'success',summary:'Apartment information saved.'})
            this.clickNew();
            this.ngOnInit();
        },
        error:(err)=> {
          this.messageService.add({severity:'error',summary:'Unable to save Apartment information.'})
        },
      });
    }
    else{
      this.apartmentService.update(apartment).subscribe({
        next:(value)=> {
          this.messageService.add({severity:'success',summary:'Apartment information updated.'});
          this.ngOnInit();
        },
        error:(err)=> {
          this.messageService.add({severity:'error',summary:'Unable to update Apartment information.'})
        },
      });
    }
  }
  clickDelete(){
    let apartmentId: number = this.apartmentForm.controls['id'].value as number;
    if(apartmentId!= 0){
      this.apartmentService.delete(apartmentId).subscribe({
        next:(value)=> {
          this.messageService.add({severity:'success',summary:'Apartment information deleted.'})
          this.apartmentForm.reset();
          this.ownerInformationForm.reset();
          this.ngOnInit();
        },
        error:(err)=> {
          this.messageService.add({severity:'error',summary:'Unable to deleted Apartment information.'})
        },
      });
    }

  }
  selectApartment(){
    this.setApartmentForm(this.selectedApartment);

    this.setOwnerForm(this.selectedApartment.Owner);
  }

  getUserByEmail(email:string){
    this.auth.getUserByEmail(email).subscribe({
      next:(value)=> {
          console.log(value);
          this.setOwnerForm(value)
      },
    })
  }
  setApartmentForm(apartment:Apartment){
    console.log(apartment);
    if(apartment!= null){
      this.apartmentForm.patchValue({
        id: apartment.Id,
        apartmentNum: apartment.ApartmentNum,
        areaSqft: apartment.AreaSqft,
        buildingId:apartment.BuildingId,
        floor: apartment.Floor,
        appUserId: apartment.AppUserId,
      });
    }
  }
  setOwnerForm(owner: AppUserDto){
    console.log(owner);
    if(owner!=null){
      this.ownerInformationForm.patchValue({
        id: owner.Id,
        firstName: owner.FirstName,
        lastName: owner.LastName,
        email: owner.Email,
        phone: owner.PhoneNumber
      });
    }
    else{
      this.ownerInformationForm.reset();
    }
  }
  onRemoveOwner(){
  }

}
