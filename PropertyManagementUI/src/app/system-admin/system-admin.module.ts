import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysAdminShellComponent } from './sys-admin-shell/sys-admin-shell.component';
import { SysAdminHomeComponent } from './sys-admin-home/sys-admin-home.component';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//FONTAWESOME
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';

//PRIME NG
import {MegaMenuModule} from 'primeng/megamenu';
import {MenubarModule} from 'primeng/menubar';
import {ListboxModule} from 'primeng/listbox';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {TabMenuModule} from 'primeng/tabmenu';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {AvatarModule} from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {DividerModule} from 'primeng/divider';
import {DialogModule} from 'primeng/dialog';

//OTHER IMPORTS
//import { NgxSpinnerModule } from "ngx-spinner";

//COMPONENTS
import { CommunitySetupComponent } from './community-setup/community-setup.component';
import { BuildingConfigComponent } from './building-config/building-config.component';
import { UnitConfigComponent } from './unit-config/unit-config.component';
import { AppModule } from '../app.module';
import { CommunityConfigComponent } from './community-config/community-config.component';
import { ApartmentConfigComponent } from './apartment-config/apartment-config.component';


@NgModule({
  declarations: [
    SysAdminShellComponent,
    SysAdminHomeComponent,
    CommunitySetupComponent,
    BuildingConfigComponent,
    UnitConfigComponent,
    CommunityConfigComponent,
    ApartmentConfigComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    //FONTAWSOME
    FontAwesomeModule,

    //PRIME NG
    MegaMenuModule,
    MenubarModule,
    ListboxModule,
    CardModule,
    InputTextModule,
    PanelModule,
    ButtonModule,
    TabMenuModule,
    TabViewModule,
    ToastModule,
    DropdownModule,
    CheckboxModule,
    AutoCompleteModule,
    AvatarModule,
    AvatarGroupModule,
    ChipModule,
    DividerModule,
    DialogModule,

    //OTHER IMPORTS
    //NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),

    //MATERIAL
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCheckboxModule

    //INTERNAL MODULES
  ]
  //schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SystemAdminModule { }
