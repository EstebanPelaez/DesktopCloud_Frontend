import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AxiosService} from "../../Services/axios/axios.service";
import {MaquinaVirtualModule} from "../../Modules/maquinavirtual/maquinavirtual.module";

@Component({
  selector: 'app-createvm',
  templateUrl: './createvm.component.html',
  styleUrls: ['./createvm.component.css']
})
export class CreatevmComponent {

  newVM1: MaquinaVirtualModule = {
    nombre: 'debian',
    ip: '192.168.1.1',
    hostname: 'root',
    idUser: '1',
    estado: 'Apagada'
  };

  constructor(private router: Router, private axiosService: AxiosService) {
  }
  crearMaquina() {

    this.axiosService.request(
      "POST",
      "/api/savevm",
      {
        nombre: this.newVM1.nombre,
        ip: this.newVM1.ip,
        hostname: this.newVM1.hostname,
        idUser: this.newVM1.idUser,
        estado: this.newVM1.estado,
      }
    ).then(response => {
      this.axiosService.setAuthToken(response.data.token);
      this.router.navigate(['/my-vm']);
    });
  }

  conectar(){
      this.axiosService.request(
        "POST",
        "http://localhost:8000/crearmv",
        {
          nombre: this.newVM1.nombre,
          ip: this.newVM1.ip,
          hostname: this.newVM1.hostname,
          idUser: this.newVM1.idUser,
          estado: this.newVM1.estado,
        }
      ).then(response => {
        this.axiosService.setAuthToken(response.data.token);
        this.router.navigate(['/createvm']);
      });
  }

  navig(path: string) {
    this.router.navigate([path])
    console.log(path)
  }
}
