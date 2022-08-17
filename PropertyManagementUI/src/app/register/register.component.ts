import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { delay } from 'rxjs';
import { Register } from '../Models/Register';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //Variables 
  isprocessing = false;

   //Form Vairables
   registerForm = new FormGroup({

    username: new FormControl('',[Validators.required]),
    email: new FormControl('',[ Validators.email, Validators.required]),
    firstName: new FormControl('',[Validators.required, Validators.maxLength(50)]),
    lastName: new FormControl('',[Validators.required, Validators.maxLength(50)]),
    phone: new FormControl('',[Validators.maxLength(15),Validators.minLength(5), Validators.required]),
    role: new FormControl('',[Validators.required]),    
    password: new FormControl('',[Validators.required]),
    password2: new FormControl('',[Validators.required])    
  })
  constructor(private authService: AuthService, private router: Router,
              private alert: MessageService) { }

  ngOnInit(): void {
  }
  get registerFormControl(){
    return this.registerForm.controls;
  }

  reenterPassword(){
    if(this.registerForm.controls['password'].value != this.registerForm.controls['password2'].value){
      this.registerForm.controls['password2'].setErrors({'matching':true});
    }
    else{
      this.registerForm.controls['password2'].clearValidators();
    }
  }
  register(){
    if(this.registerForm.touched && this.registerForm.valid){
      this.isprocessing = true;
      let registerUser = new Register();
      registerUser.Email = this.registerForm.controls['email'].value as string;
      registerUser.FirstName = this.registerForm.controls['firstName'].value as string;
      registerUser.LastName = this.registerForm.controls['lastName'].value as string;
      registerUser.UserName = this.registerForm.controls['username'].value as string;
      registerUser.Phone = this.registerForm.controls['phone'].value as string;
      registerUser.Role = this.registerForm.controls['role'].value as string;
      registerUser.Password = this.registerForm.controls['password'].value as string;
      this.authService.register(registerUser).subscribe({
        next:(r)=>{
          this.alert.add({ severity:'success',summary:'Registration completed.',detail: ''});   
               
          setTimeout(()=>{ this.isprocessing = false; this.router.navigate(['/login']);   },3000);
          //this.router.navigate(['/login']);
        },
        error:(e)=>{
          this.isprocessing = false;
          console.log(e);
          this.alert.add({ severity:'error',summary:'Registration failed.',detail:e.message});
        }
      })
      console.log(this.registerForm);
    }    
  }
  

}
