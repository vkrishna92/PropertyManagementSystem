import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyProfleComponent } from './my-profle/my-profle.component';
import { CommunitySetupComponent } from './system-admin/community-setup/community-setup.component';
import { SysAdminHomeComponent } from './system-admin/sys-admin-home/sys-admin-home.component';
import { SysAdminShellComponent } from './system-admin/sys-admin-shell/sys-admin-shell.component';

const routes: Routes = [  
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'myprofile',component:MyProfleComponent},
  {path:'sysadmin',component:SysAdminShellComponent,
    children:[
      {path:'',component:SysAdminHomeComponent},
      {path:'communitysetup',component:CommunitySetupComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
