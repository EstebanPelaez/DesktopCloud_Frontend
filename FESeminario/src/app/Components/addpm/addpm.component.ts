import { Component } from '@angular/core';
import {AxiosService} from "../../Services/axios/axios.service";
import {NavigationEnd, Router} from "@angular/router";
import {MaquinavirtualService} from "../../Services/maquinavirtual/maquinavirtual.service";
import {UsuarioService} from "../../Services/usuario/usuario.service";
import {MaquinafisicaModule} from "../../Modules/maquinafisica/maquinafisica.module";
import {MaquinafisicaService} from "../../Services/maquinafisica/maquinafisica.service";

@Component({
  selector: 'app-addpm',
  templateUrl: './addpm.component.html',
  styleUrls: ['./addpm.component.css']
})
export class AddpmComponent {

  select = [false, false, false, false];
  newpm:MaquinafisicaModule={adaptador:'', cpu: 0, hostname:'', ip:'', os:'', ram: 0, almacenamiento: 0}
  constructor(private axiosService:AxiosService, private router: Router, private maquinaService:MaquinafisicaService, private usuarioService:UsuarioService) {

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

  agregarMaquinaFisica(){
    this.axiosService.request(
      "POST",
      "/api/savepm",
      {
        adaptador: this.newpm.adaptador,
        cpu: this.newpm.cpu,
        hostname: this.newpm.hostname,
        ip: this.newpm.ip,
        os: this.newpm.os,
        ram: this.newpm.ram,
        almacenamiento: this.newpm.almacenamiento
      }
    ).then(response => {

    })
  }
  navig  (path:string){
    this.router.navigate([path]);
    console.log(path);
  }
}
