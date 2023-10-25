import { Component } from '@angular/core';
import {AxiosService} from "../../Services/axios/axios.service";
import {NavigationEnd, Router} from "@angular/router";
import {MaquinavirtualService} from "../../Services/maquinavirtual/maquinavirtual.service";
import {UsuarioService} from "../../Services/usuario/usuario.service";

@Component({
  selector: 'app-addpm',
  templateUrl: './addpm.component.html',
  styleUrls: ['./addpm.component.css']
})
export class AddpmComponent {

  select = [false, false, false, false];
  constructor(private axiosService:AxiosService, private router: Router, private maquinaService:MaquinavirtualService, private usuarioService:UsuarioService) {

    this.select = [true, false];
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        console.log("EVENT", event)
        switch (event.urlAfterRedirects){
          case "/":
            this.select = [false, false, false, false];break;
          case "/userprofile":
            this.select = [true, false, false, false];break;
          case "/my-vm":
            this.select = [false, true, false, false];break;
          case "/addpm":
            this.select = [false, false, true, false];break;
          case "/my-vm":
            this.select = [false, false, false, true];break;
          default:
            this.select = [true, false, false, false]; break;
        }
      }
    })
  }
  navig  (path:string){
    this.router.navigate([path]);
    console.log(path);
  }
}
