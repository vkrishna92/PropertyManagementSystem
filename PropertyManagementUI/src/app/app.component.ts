import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PropertyManagementUI';
  /**
   *
   */
  constructor(private auth:AuthService, private router:Router,
              private primengConfig: PrimeNGConfig) {  
  }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if(this.auth.IsLoginValid()){
      this.router.navigate(['/login']);
    }
  }
}
