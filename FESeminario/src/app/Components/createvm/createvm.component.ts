import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AxiosService} from "../../Services/axios/axios.service";
import {MaquinaVirtualModule} from "../../Modules/maquinavirtual/maquinavirtual.module";
import {HttpClient} from "@angular/common/http";

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
    idUser: 1,
    estado: 'Apagada',
    idMF: 0,
    tipoMV: 1
  };

  constructor(private router: Router, private axiosService: AxiosService, private http: HttpClient) {
  }

  /*crearMaquina() {
    this.axiosService.request(
      "POST",
      "/api/savevm",
      {
        nombre: this.newVM1.nombre,
        ip: this.newVM1.ip,
        hostname: this.newVM1.hostname,
        idUser: this.newVM1.idUser,
        tipoMV: this.newVM1.tipoMV,
        idMF: this.newVM1.idMF,
        estado: this.newVM1.estado,
        solicitud: "create"
      }
    )
  }*/

  conectar() {
    return this.http.post(
      "http://localhost:8000/crearmv", {
        nombre: this.newVM1.nombre,
        ip: this.newVM1.ip,
        hostname: this.newVM1.hostname,
        idUser: this.newVM1.idUser,
        tipoMV: this.newVM1.tipoMV,
        idMF: this.newVM1.idMF,
        estado: this.newVM1.estado,
        solicitud: "create",
        numeroNombre: window.localStorage.getItem("numbervm")
      },
      {
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    ).subscribe({
      next:(result:any) =>{
        let numero:number = parseInt(window.localStorage.getItem("numbervm")!)
        window.localStorage.setItem("numbervm", (numero+1).toString())
        }
      }
    )
  }

  navig(path: string) {
    this.router.navigate([path])
    console.log(path)
  }
}
