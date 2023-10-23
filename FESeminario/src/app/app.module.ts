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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    MyVMComponent,
    RegistroComponent,
    UserprofileComponent,
    CreatevmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [MaquinavirtualService, AxiosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
