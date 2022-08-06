import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysAdminShellComponent } from './sys-admin-shell/sys-admin-shell.component';
import { SysAdminHomeComponent } from './sys-admin-home/sys-admin-home.component';
import { RouterModule } from '@angular/router';

//MATERIAL
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';

//COMPONENTS
import { CommunitySetupComponent } from './community-setup/community-setup.component';


@NgModule({
  declarations: [
    SysAdminShellComponent,
    SysAdminHomeComponent,
    CommunitySetupComponent,      
  ],
  imports: [
    CommonModule,
    RouterModule,    

    //MATERIAL
    MatCardModule,
    MatTabsModule
  ]
})
export class SystemAdminModule { }
