import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthDataService } from '../Services/auth-data.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isprocessing = false;
  items: MenuItem[];
  sideNavOpen = false;
  @Input() Visible: boolean;
  @Input() DisplayName:string;
  @Output() sidemenuEvent = new EventEmitter<any>();

  isLoggedIn$: Observable<boolean>;
  display_name$: Observable<string>;
  constructor(private auth:AuthService, private authData:AuthDataService) { }

  ngOnInit(): void {
    console.log("NavBar component Init");
    this.items = [
      { label: 'Profile', icon:'pi pi-user', routerLink:'/myprofile'},
      { label: 'Sign out', icon:'pi pi-sign-out',command:()=>{this.auth.logout()}}
    ];
    this.isLoggedIn$ = this.auth.loggedIn;
    this.display_name$ = this.auth.display_name$;
  }
  logout(){
    this.isprocessing = true;
    setTimeout(()=>{
      this.isprocessing = false;
      this.auth.logout();
    },2000)

  }
  sideMenuClick(){
    this.sidemenuEvent.emit();
  }

}
