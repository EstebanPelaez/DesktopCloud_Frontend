import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./Components/login/login.component";
import {RegistroComponent} from "./Components/registro/registro.component";
import {MyVMComponent} from "./Components/my-vm/my-vm.component";
import {UserprofileComponent} from "./Components/userprofile/userprofile.component";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {path:'', redirectTo:'inicio', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'registro', component:RegistroComponent},
  {path:'my-vm', component:MyVMComponent},
  {path:'userprofile', component:UserprofileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export class AppModule { }
