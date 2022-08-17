import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommunityService } from 'src/app/Services/community.service';

@Component({
  selector: 'app-community-config',
  templateUrl: './community-config.component.html',
  styleUrls: ['./community-config.component.css']
})
export class CommunityConfigComponent implements OnInit {

  //Form Variables
  commConfigForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    address1 : new FormControl('',[Validators.required]),
    address2: new FormControl(''),
    city: new FormControl('',[Validators.required]),
    state: new FormControl('',[Validators.required]),
    country : new FormControl('INDIA',[Validators.required]),
    zipcode: new FormControl('',[Validators.required])
  });  
  constructor(private communityService: CommunityService) { }

  ngOnInit(): void {
    this.communityService.Get().subscribe({
      next(value) {
          console.log(value);
      },
    })
  }

}
