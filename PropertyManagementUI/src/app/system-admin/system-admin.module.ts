import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysAdminShellComponent } from './sys-admin-shell/sys-admin-shell.component';
import { SysAdminHomeComponent } from './sys-admin-home/sys-admin-home.component';
import { RouterModule } from '@angular/router';

//MATERIAL
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';

//PRIME NG
import {MegaMenuModule} from 'primeng/megamenu';
import {MenubarModule} from 'primeng/menubar';
import {ListboxModule} from 'primeng/listbox';
import {CardModule} from 'primeng/card';


//COMPONENTS
import { CommunitySetupComponent } from './community-setup/community-setup.component';
import { BuildingConfigComponent } from './building-config/building-config.component';
import { UnitConfigComponent } from './unit-config/unit-config.component';
import { AppModule } from '../app.module';
import { CommunityConfigComponent } from './community-config/community-config.component';


@NgModule({
  declarations: [
    SysAdminShellComponent,
    SysAdminHomeComponent,
    CommunitySetupComponent,
    BuildingConfigComponent,
    UnitConfigComponent,
    CommunityConfigComponent,      
  ],
  imports: [
    CommonModule,
    RouterModule,  
    
    //PRIME NG
    MegaMenuModule,
    MenubarModule,
    ListboxModule,
    CardModule,

    //MATERIAL
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatExpansionModule

    //INTERNAL MODULES 
  ]
})
export class SystemAdminModule { }
