import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthDataService } from '../Services/auth-data.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  items: MenuItem[];
  @Input() Visible: boolean;
  @Input() DisplayName:string;
  constructor(private auth:AuthService, private authData:AuthDataService) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Profile', icon:'pi pi-user', routerLink:'/myprofile'},
      { label: 'Sign out', icon:'pi pi-sign-out',command:()=>{this.auth.logout()}}
    ];
    
  }

}
