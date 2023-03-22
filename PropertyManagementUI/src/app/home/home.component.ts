import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Apartment } from '../Models/Apartment';
import { AppUserDto } from '../Models/AppUser';
import { ApartmentService } from '../Services/apartment.service';
import { AuthDataService } from '../Services/auth-data.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  display_name='';
  userApartments : Apartment[] = [];
  selectedApartment: Apartment;
  displayModal = false;
  users:AppUserDto[] = [];
  selectedUser: AppUserDto;
  isProcessing = false;

  constructor(private authService: AuthService, private apartmentService: ApartmentService, private messageService: MessageService) {
   }

  ngOnInit(): void {
    this.display_name = this.authService.getAttributeValue('unique_name');
    console.log(this.display_name);
    this.apartmentService.getMyUnits().subscribe({
      next:(r)=>{
        this.userApartments = r;
        console.log(r);
      }
    })
  }
  findUsers(name:string){
    this.authService.getUsersByName(name).subscribe({
      next:(r)=>{
        this.users = r;
      },
      error:(err)=>{
      }
    })
  }
  viewModal(val: Apartment){
    this.selectedApartment = val;
    this.displayModal = true;
  }

  addTenant(){
    this.selectedApartment.TenantId = this.selectedUser.Id;
    this.selectedApartment.Tenant = this.selectedUser;

    this.apartmentService.update(this.selectedApartment).subscribe({
      next:(r)=>{
        this.messageService.add({severity:'success', summary:'Tenant added.'});
      },
      error:(err)=>{
        this.messageService.add({severity:'error',summary:'Tenat save failed.'});
      }
    })
  }

}
