import { Component, OnInit } from '@angular/core';
import { Apartment } from '../Models/Apartment';
import { ApartmentService } from '../Services/apartment.service';
import { AuthDataService } from '../Services/auth-data.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  display_name='';
  userApartments : Apartment[] = [];
  constructor(private authService: AuthService, private apartmentService: ApartmentService) { }

  ngOnInit(): void {
    this.display_name = this.authService.getAttributeValue('unique_name');
    console.log(this.display_name);
    this.apartmentService.getMyUnits().subscribe({
      next:(r)=>{
        this.userApartments = r;
        console.log(r);
      }
    })
  }

}
