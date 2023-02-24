import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  dialogUserType = "";
  dialogAppUser: AppUserDto;

  //Pagination Params
  pagination : PaginationParameters = {PageNumber:1, PageSize: 20};

  //boolean
  displayDialog = false;

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
  });
  tenantInformationForm = new FormGroup({
    id: new FormControl({value:'',disabled:true}),
    firstName: new FormControl({value:'',disabled:true}),
    lastName: new FormControl({value:'',disabled:true}),
    email: new FormControl({value:'',disabled:true}),
    phone: new FormControl({value:'',disabled:true})
  });
  appUserInformationForm = new FormGroup({
    id: new FormControl({value:'',disabled:true}),
    firstName: new FormControl({value:'',disabled:true}),
    lastName: new FormControl({value:'',disabled:true}),
    email: new FormControl({value:'',disabled:true}),
    phone: new FormControl({value:'',disabled:true})
  });

  constructor(private buildingService: BuildingService, private apartmentService: ApartmentService,
    private messageService: MessageService, private auth: AuthService, private router: Router) {
    this.items = [
      { label: 'New', icon: 'pi pi-fw pi-plus', command: (event)=>{this.clickNew();}},
      { label: 'Save', icon: 'pi pi-fw pi-save', command: (event)=>{this.clickSave()}},
      { label: 'Delete', icon: 'pi pi-fw pi-trash', command: (event)=>{this.clickDelete()}},
      { label: 'Maintenance', icon: 'pi pi-fw pi-calendar', command: (event)=>{this.clickPaymentPeriods()}},
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
            let tenant = this.apartments[0].Tenant;
            this.setOwnerForm(owner);
            this.setTenantForm(tenant);
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
    let apartment: Apartment = {
      Id: this.apartmentForm.controls['id'].value,
      ApartmentNum: this.apartmentForm.controls['apartmentNum'].value,
      Floor: this.apartmentForm.controls['floor'].value,
      BuildingId: this.apartmentForm.controls['buildingId'].value,
      AreaSqft:  this.apartmentForm.controls['areaSqft'].value,
      AppUserId: this.ownerInformationForm.controls["id"].value,
      TenantId: this.tenantInformationForm.controls["id"].value,
      Owner: null,
      Tenant: null,
      Building: null,
      CreatedBy: null,
      CreatedDateTime: new Date(),
      ModifiedBy: null,
      ModifiedDateTime: new Date()
    }
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
    console.log(this.selectedApartment)
    this.setApartmentForm(this.selectedApartment);

    this.setOwnerForm(this.selectedApartment.Owner);
    this.setTenantForm(this.selectedApartment.Tenant);
  }
  getTenantByEmail(email:string){
    this.auth.getUserByEmail(email).subscribe({
      next:(value)=> {
          console.log(value);
          this.setTenantForm(value)
      },
    })
  }
  getUserByEmail(email:string){
    this.auth.getUserByEmail(email).subscribe({
      next:(value)=> {
          console.log(value);
          this.setOwnerForm(value)
      },
    })
  }
  getAppUserByEmail(email:string){
    this.auth.getUserByEmail(email).subscribe({
      next:(value)=> {
          this.dialogAppUser = value;
          this.setAppUserForm(value);
      },
    })
  }
  setApartmentForm(apartment:Apartment){
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
  setTenantForm(tenant:AppUserDto){
    if(tenant!=null){
      this.tenantInformationForm.patchValue({
        id: tenant.Id,
        firstName: tenant.FirstName,
        lastName: tenant.LastName,
        email: tenant.Email,
        phone: tenant.PhoneNumber
      });
    }
    else{
      this.tenantInformationForm.reset();
    }
  }
  setAppUserForm(appUser: AppUserDto){
    console.log(appUser);
    if(appUser!=null){
      this.appUserInformationForm.patchValue({
        id: appUser.Id,
        firstName: appUser.FirstName,
        lastName: appUser.LastName,
        email: appUser.Email,
        phone: appUser.PhoneNumber
      });
    }
    else{
      this.appUserInformationForm.reset();
    }
  }
  setOwnerForm(owner: AppUserDto){
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
  clickPaymentPeriods(){
    this.router.navigate(['/payment-periods', this.selectedApartment.Id]);
  }
  clickFindOwner(){

  }

  //Dialog Methods
  openFindUserDialog(userType:string){
    this.dialogUserType = userType;
    this.displayDialog = true;
  }
  saveFindUserDialog(){
    if(this.dialogAppUser!= undefined){
      if(this.dialogUserType == 'owner'){
        this.setOwnerForm(this.dialogAppUser);
        this.displayDialog = false;
      }
      else if(this.dialogUserType == 'tenant'){
        this.setTenantForm(this.dialogAppUser);
        this.displayDialog = false;
      }
    }
    else{
      this.displayDialog = false;
    }

  }
  hideOwnerDialog(){
    console.log("hidden dialog")
  }
}
