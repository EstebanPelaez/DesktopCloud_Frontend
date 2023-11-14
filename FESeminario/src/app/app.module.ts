import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { MyVMComponent } from './Components/my-vm/my-vm.component';
import { RegistroComponent } from './Components/registro/registro.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { UserprofileComponent } from './Components/userprofile/userprofile.component';
import {CommonModule} from "@angular/common";
import { CreatevmComponent } from './Components/createvm/createvm.component';
import { AxiosService} from "./Services/axios/axios.service";
import { MaquinavirtualService} from "./Services/maquinavirtual/maquinavirtual.service";
import { RolesDirective } from './Components/Directive/roles.directive';
import { AddpmComponent } from './Components/addpm/addpm.component';
import { HomeComponent } from './Components/home/home.component';
import { VmdetailsComponent } from './Components/vmdetails/vmdetails.component';
import { DialogvmComponent } from './Components/dialogvm/dialogvm.component';
import { MonitoringComponent } from './Components/monitoring/monitoring.component';
import { LateralComponent } from './Components/lateral/lateral.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    MyVMComponent,
    RegistroComponent,
    UserprofileComponent,
    CreatevmComponent,
    RolesDirective,
    AddpmComponent,
    HomeComponent,
    VmdetailsComponent,
    DialogvmComponent,
    MonitoringComponent,
    LateralComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  providers: [MaquinavirtualService, AxiosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
