import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthDataService } from './Services/auth-data.service';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'Property Management';
  /**
   *
   */
  navBar=false;
  display_name ='';
  loggedIn$: Observable<boolean>;
  constructor(private auth:AuthService,private authData:AuthDataService, private router:Router,
              private primengConfig: PrimeNGConfig, private messageService: MessageService) {  
  }
  ngOnInit(): void {
    console.log("app component init");    
    this.primengConfig.ripple = true;
    this.loggedIn$ = this.auth.loggedIn;
    if(!this.authData.isExpired()){
      console.log("All ok!");
      this.navBar = true;
      this.auth.loggedIn.next(true);   
      let display_name = this.auth.getAttributeValue('unique_name');
      this.auth.display_name$.next(display_name);
      console.log(this.display_name)
    }
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
  }
}
