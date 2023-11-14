import {Component, OnInit} from '@angular/core';
import {AxiosService} from "../../Services/axios/axios.service";
import {NavigationEnd, Router} from "@angular/router";
import {MaquinavirtualService} from "../../Services/maquinavirtual/maquinavirtual.service";
import {UsuarioService} from "../../Services/usuario/usuario.service";
import {MaquinafisicaModule} from "../../Modules/maquinafisica/maquinafisica.module";
import {MaquinafisicaService} from "../../Services/maquinafisica/maquinafisica.service";
import {AlertService} from "../../Services/alert/alert.service";

@Component({
  selector: 'app-addpm',
  templateUrl: './addpm.component.html',
  styleUrls: ['./addpm.component.css']
})
export class AddpmComponent implements OnInit{

  newpm:MaquinafisicaModule={adaptador:'', cpu: 0, hostname:'', ip:'', os:'', ram: 0, almacenamiento: 0}
  constructor(private alertService:AlertService, private axiosService:AxiosService, private router: Router, private maquinaService:MaquinafisicaService, private usuarioService:UsuarioService) {

  }

  ngOnInit(){
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
