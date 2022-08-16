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
  //Spinner
  isprocessing = false;

  //Form Vairables
  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })
  constructor(private auth:AuthService, private router: Router, private alert: MessageService) { }

  ngOnInit(): void {
    console.log("Login Init")
    if(this.auth.IsLoginValid()){
      this.router.navigate(['/home']);
    }
    localStorage.removeItem('token');   

  }
  login(){    

    if(this.loginForm.valid && this.loginForm.touched){
      let login = new Login();
      login.userName = this.loginForm.controls['username'].value;
      login.password = this.loginForm.controls['password'].value;
      this.isprocessing = true;
      this.auth.login(login).subscribe({
        next:(r) =>{
          localStorage.setItem('access_token',r.token);
          this.auth.loggedIn.next(true);
          let display_name = this.auth.getAttributeValue('unique_name');
          this.auth.display_name$.next(display_name);
          setTimeout(()=>{ this.isprocessing = false; this.router.navigate(['/home']);   },3000);          
          this.router.navigate(['/home']);
        },
        error:(e)=>{
          this.isprocessing = false;
          console.log(e);
          this.alert.add({ severity:'error',summary:'Login failed.',detail:'Invalid credentials.'});
        }
      })
    }
  }
}
