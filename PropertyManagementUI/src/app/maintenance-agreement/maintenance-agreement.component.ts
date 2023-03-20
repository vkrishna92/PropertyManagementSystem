import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Apartment } from '../Models/Apartment';
import { AppUserDto } from '../Models/AppUser';
import { MaintenanceAgreement } from '../Models/MaintenanceAgreement';
import { ApartmentService } from '../Services/apartment.service';

@Component({
  selector: 'app-maintenance-agreement',
  templateUrl: './maintenance-agreement.component.html',
  styleUrls: ['./maintenance-agreement.component.css']
})
export class MaintenanceAgreementComponent implements OnInit {

  apartmentId = 0;
  apartment: Apartment;
  maintenanceAgreement: MaintenanceAgreement;
  users : AppUserDto[]= [];
  check = true;
  //MODAL Variables
  displayModal = false;
  maintenanceAgreementForm= new FormGroup({
    id: new FormControl(0),
    appUserId: new FormControl(''),
    unit: new FormControl({value:'',disabled:true}),
    fromDate: new FormControl(new Date()),
    toDate: new FormControl(new Date()),
    amount: new FormControl(0),
    endAgreement: new FormControl(false)
  });
  checked1: boolean = false;
  constructor(private route:ActivatedRoute,private apartmentService:ApartmentService, private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.apartmentId = Number(this.route.snapshot.paramMap.get('id'))
    console.log(this.apartmentId);
    this.apartmentService.get(this.apartmentId).subscribe({
      next:(resp)=>{
        this.apartment = resp;
        console.log(this.apartment);
        //POPULATE DROPDOWN
        if(this.apartment.Owner != null){
          this.users.push(this.apartment.Owner as AppUserDto);
        }
        if(this.apartment.Tenant!=null){
          this.users.push(this.apartment.Tenant as AppUserDto);
        }

        //GET Active maintenace Agreement
        this.apartmentService.getMaintenanceAgreementByApartmentId(this.apartmentId).subscribe({
          next:(resp)=>{
            console.log(resp);
            this.maintenanceAgreement = resp;
            //POPULATE FORM
            if(this.maintenanceAgreement == null){
              this.maintenanceAgreementForm.patchValue({
                id: 0,
                appUserId:'',
                unit: this.apartment.ApartmentNum,
                fromDate: new Date(),
                toDate: new Date(),
                amount:0,
                endAgreement:false
              });
            }
            else{
              console.log(this.maintenanceAgreement)
              this.maintenanceAgreementForm.patchValue({
                id: this.maintenanceAgreement.Id,
                appUserId:this.maintenanceAgreement.AppUserId,
                unit: this.apartment.ApartmentNum,
                fromDate: new Date(this.maintenanceAgreement.FromDate),
                toDate: new Date( this.maintenanceAgreement.ToDate),
                amount:this.maintenanceAgreement.MaintenanceAmount,
                endAgreement: this.maintenanceAgreement.IsDisabled
            })

          }
        }
      })
    }
    })
  }
  setAgreementForm(agreement: MaintenanceAgreement){

  }
  //Agreement Tab
  clickAgreementSave() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.maintenanceAgreement ={
            Id : this.maintenanceAgreementForm.controls['id'].value as number,
            AppUserId: this.maintenanceAgreementForm.controls['appUserId'].value as string,
            ApartmentId: this.apartmentId,
            FromDate: this.maintenanceAgreementForm.controls['fromDate'].value as Date,
            ToDate: this.maintenanceAgreementForm.controls['toDate'].value as Date,
            MaintenanceAmount : this.maintenanceAgreementForm.controls['amount'].value as number,
            IsDisabled: this.maintenanceAgreementForm.controls['endAgreement'].value as boolean,
            AppUser: null,
            Apartment: null,
            CreatedBy:null,
            CreatedDateTime: new Date(),
            ModifiedBy: null,
            ModifiedDateTime: new Date()
          }
          console.log(this.maintenanceAgreement);
          this.saveMaintenanceAgreement(this.maintenanceAgreement);

        },
        reject: (type: any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
        }
    });
  }

  saveMaintenanceAgreement(agreement : MaintenanceAgreement){
    if(agreement.Id != 0){
      //update
      this.apartmentService.updateMaintenanceAgreement(this.maintenanceAgreement).subscribe({
        next:(resp)=>{
          this.messageService.add({severity:'success', summary:'Success', detail:'Maintenance agreement saved.'});
        },
        error:(err)=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'Unable to save Maintenance Agreement'});
        }
      })

    }
    else{
      //insert
      this.apartmentService.postMaintenanceAgreement(this.maintenanceAgreement).subscribe({
        next:(resp)=>{
          this.messageService.add({severity:'info', summary:'Success', detail:'Maintenance agreement saved.'});
        },
        error:(err)=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'Unable to save Maintenance Agreement'});
        }
      })
    }
  }
}
