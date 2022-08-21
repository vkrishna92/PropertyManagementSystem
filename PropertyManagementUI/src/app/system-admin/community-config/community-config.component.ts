import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Community } from 'src/app/Models/Community';
import { CommunityService } from 'src/app/Services/community.service';

@Component({
  selector: 'app-community-config',
  templateUrl: './community-config.component.html',
  styleUrls: ['./community-config.component.css']
})
export class CommunityConfigComponent implements OnInit {

  //Form Variables
  communityForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    address1 : new FormControl('',[Validators.required]),
    address2: new FormControl(''),
    city: new FormControl('',[Validators.required]),
    state: new FormControl('',[Validators.required]),
    country : new FormControl('INDIA',[Validators.required]),
    zipcode: new FormControl('',[Validators.required])
  });  
  currentCommunity : Community;
  constructor(private communityService: CommunityService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCommunityInfo();
  }
  getCommunityInfo(){
    this.communityService.Get().subscribe({
      next: (r)=>{
        this.currentCommunity = r;
        this.setCommunityForm(r);
      },error:(err)=> {
          this.messageService.add({severity:'error',summary:'Unable to fetch community information'});
      },
    });
  }
  setCommunityForm(community:Community){
    console.log(community);
    this.communityForm.patchValue({
      name: community.Name,
      address1: community.AddressLine1,
      address2: community.AddressLine2,
      city: community.City,
      state: community.State,
      country: community.Country,
      zipcode: community.Zipcode
    });
  }

  save(){
    if(this.communityForm.valid && this.communityForm.touched){
      if(this.currentCommunity){
        this.currentCommunity.Name = this.communityForm.controls['name'].value;
        this.currentCommunity.AddressLine1 = this.communityForm.controls['address1'].value;
        this.currentCommunity.AddressLine2 = this.communityForm.controls['address2'].value;
        this.currentCommunity.City = this.communityForm.controls['city'].value;
        this.currentCommunity.State = this.communityForm.controls['state'].value;
        this.currentCommunity.Country = this.communityForm.controls['country'].value;
        this.currentCommunity.Zipcode = this.communityForm.controls['zipcode'].value;
        this.communityService.update(this.currentCommunity).subscribe({
          next:(r)=>{
            this.messageService.add({severity:'success',summary:'Community information updated.'});
          }
        })
      }
    }
  }
  cancel(){    
    this.getCommunityInfo();
  }

}
