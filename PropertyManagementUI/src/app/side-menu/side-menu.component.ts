import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  @Input() sideNav:MatSidenav;
  constructor() { }

  ngOnInit(): void {
  }
  toggleSideNav(){
    this.sideNav.toggle();
  }
}
