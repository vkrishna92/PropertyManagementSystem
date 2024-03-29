import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//PrimeNg
import {ToastModule} from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {PasswordModule} from 'primeng/password';
import {SidebarModule} from 'primeng/sidebar';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {MegaMenuModule} from 'primeng/megamenu';
import {TooltipModule} from 'primeng/tooltip';
import {PanelModule} from 'primeng/panel';
import {MenubarModule} from 'primeng/menubar';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {InputSwitchModule} from 'primeng/inputswitch';
import { TableModule } from "primeng/table";
import { ChipModule } from 'primeng/chip';
import {CarouselModule} from 'primeng/carousel';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DividerModule} from 'primeng/divider';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {ListboxModule} from 'primeng/listbox';
import {SkeletonModule} from 'primeng/skeleton';


//ANGULAR MATERIAL
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRippleModule} from '@angular/material/core';


//OTHER IMPORTS
import { NgxSpinnerModule } from "ngx-spinner";
import { AgGridModule } from 'ag-grid-angular';


//COMPONENTS
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MessageService } from 'primeng/api';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MyProfleComponent } from './my-profle/my-profle.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SystemAdminModule } from './system-admin/system-admin.module';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { RegisterComponent } from './register/register.component';
import { AuthHeaderInterceptor } from './interceptors/auth-header.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FinanceDashboardComponent } from './finance-dashboard/finance-dashboard.component';
import {CalendarModule} from 'primeng/calendar';
import { CommunityServiceComponent } from './community-service/community-service.component';
import { UnitPaymentPeriodComponent } from './unit-payment-period/unit-payment-period.component';
import { MaintenanceAgreementComponent } from './maintenance-agreement/maintenance-agreement.component';
import { AddEditTenantComponent } from './add-edit-tenant/add-edit-tenant.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    MyProfleComponent,
    SideMenuComponent,
    SpinnerOverlayComponent,
    RegisterComponent,
    FinanceDashboardComponent,
    CommunityServiceComponent,
    UnitPaymentPeriodComponent,
    MaintenanceAgreementComponent,
    AddEditTenantComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    //PRIME NG
    ToastModule,
    InputTextModule,
    RippleModule,
    ButtonModule,
    CardModule,
    PasswordModule,
    CheckboxModule,
    SidebarModule,
    MenuModule,
    MegaMenuModule,
    TooltipModule,
    DialogModule,
    DropdownModule,
    TabMenuModule,
    TableModule,
    TabViewModule,
    ConfirmDialogModule,
    InputSwitchModule,
    ChipModule,
    CarouselModule,
    OverlayPanelModule,
    AvatarModule,
    AvatarGroupModule,
    DividerModule,
    ListboxModule,
    SkeletonModule,

    //MATERIAL
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTabsModule,
    MatRippleModule,

    //OTHER IMPORTS
    NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate' }),
    AgGridModule,

    //CUSTOM MODULES
    SystemAdminModule,

    //PrimeNg
    CalendarModule,
    PanelModule,
    MenubarModule,

    NgbModule,
    FontAwesomeModule
  ],
  providers: [MessageService,ConfirmationService,
  {provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
