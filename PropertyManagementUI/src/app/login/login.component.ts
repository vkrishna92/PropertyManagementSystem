import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Login } from '../Models/Login';
import { AlertService } from '../Services/alert.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })
  constructor(private auth:AuthService, private router: Router, private alert: MessageService) { }

  ngOnInit(): void {
    localStorage.removeItem('token');    
  }
  login(){    
    if(this.loginForm.valid && this.loginForm.touched){
      let login = new Login();
      login.userName = this.loginForm.controls['email'].value;
      login.password = this.loginForm.controls['password'].value;
      this.auth.login(login).subscribe({
        next:(r) =>{
          localStorage.setItem('access_token',r.token);
          this.router.navigate(['/home']);
        },
        error:(e)=>{
          console.log(e);
          this.alert.add({ severity:'error',summary:'Login failed.',detail:'Invalid credentials.'});
        }
      })
    }
  }
}
