import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthDataService } from './Services/auth-data.service';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'PropertyManagementUI';
  /**
   *
   */
  navBar=false;
  display_name ='';
  constructor(private auth:AuthService,private authData:AuthDataService, private router:Router,
              private primengConfig: PrimeNGConfig, private messageService: MessageService) {  
  }
  ngOnInit(): void {
    console.log("app component init");
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'})
    this.primengConfig.ripple = true;
    if(!this.authData.isExpired()){
      console.log("All ok!");
      this.navBar = true;
      this.display_name = this.authData.getAttributeValue('unique_name');
      console.log(this.display_name)
    }
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
  }
}
