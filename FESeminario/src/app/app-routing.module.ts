import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./Components/login/login.component";
import {RegistroComponent} from "./Components/registro/registro.component";
import {MyVMComponent} from "./Components/my-vm/my-vm.component";
import {UserprofileComponent} from "./Components/userprofile/userprofile.component";
import {CreatevmComponent} from "./Components/createvm/createvm.component";
import {AddpmComponent} from "./Components/addpm/addpm.component";
import {HomeComponent} from "./Components/home/home.component";
import {MonitoringComponent} from "./Components/monitoring/monitoring.component";
import {ResourcesComponent} from "./Components/resources/resources.component";
import {AyudaComponent} from "./Components/ayuda/ayuda.component";

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'registro', component:RegistroComponent},
  {path:'my-vm', component:MyVMComponent},
  {path:'userprofile', component:UserprofileComponent},
  {path:'createvm', component:CreatevmComponent},
  {path: 'addpm', component:AddpmComponent},
  {path: 'home', component:HomeComponent},
  {path: 'monitoring', component:MonitoringComponent},
  {path: 'resources', component:ResourcesComponent},
  {path: 'help', component:AyudaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

