import { Component, OnInit } from '@angular/core';
import { AuthDataService } from '../Services/auth-data.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  display_name='';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.display_name = this.authService.getAttributeValue('unique_name');
    console.log(this.display_name);
  }

}
