import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AxiosService} from "../../Services/axios/axios.service";
import {MaquinaVirtualModule} from "../../Modules/maquinavirtual/maquinavirtual.module";
import {HttpClient} from "@angular/common/http";
import {AlertService} from "../../Services/alert/alert.service";
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
import {UsuarioService} from "../../Services/usuario/usuario.service";
import {JwtService} from "../../Services/jwt.service";

@Component({
  selector: 'app-createvm',
  templateUrl: './createvm.component.html',
  styleUrls: ['./createvm.component.css']
})
export class CreatevmComponent {

  newVM1: MaquinaVirtualModule = {
    nombre: 'debian',
    ip: 'No asignada',
    hostname: '',
    idUser: 1,
    estado: 'Apagada',
    idMF: 0,
    tipoMV: 1
  };

  userUnlogged: UsuarioModule = {
    nombre: '',
    apellidos: 'unlogged',
    correo: 'unlogged'+window.localStorage.getItem("numbervm"),
    tipousuario: '4',
    contrasenia: 'unlogged'}

  constructor(private router: Router, private axiosService: AxiosService, private http: HttpClient, private usuarioService: UsuarioService, private decoder:JwtService, private alertService: AlertService) {
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


  async conectar() {

    if (!this.axiosService.getAuthToken()) {
      console.log("NO TIENE TOKEN "+this.userUnlogged.correo);
      this.usuarioService.crearUsuario(this.userUnlogged);
      await new Promise(f => setTimeout(f, 3000));
    }
    console.log("SE PROCEDE A CREAR LA MAQUINA")
    let token: any = this.decoder.DecodeToken(this.axiosService.getAuthToken()!);
    this.newVM1.idUser = token.id;
    let nombre = this.newVM1.nombre + localStorage.getItem("numbervm")!
    this.validarNombre(nombre);
    console.log(window.localStorage.getItem("numbervm"))
    this.alertService.showError("Aviso", "Se ha creado una máquina virtual",3000);
    return this.http.post(
      "http://"+window.localStorage.getItem("ipsolic")!+":8000/crearmv", {
        nombre: this.newVM1.nombre,
        ip: this.newVM1.ip,
        hostname: this.newVM1.hostname,
        idUser: this.newVM1.idUser,
        contrasenia: "1234",
        tipoMV: this.newVM1.tipoMV,
        idMF: this.newVM1.idMF,
        estado: this.newVM1.estado,
        solicitud: "create",
        numeroNombre: window.localStorage.getItem("numbervm")
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
      }
    ).subscribe({
      next:(result:any) =>{
        let numeroAleatorio = Math.random();
        let numeroEnRango = Math.floor(numeroAleatorio * (1000000 - 1)) + 1;
        window.localStorage.setItem("numbervm", numeroEnRango.toString());
        }
      }
      );


  }

  navig(path: string) {
    this.router.navigate([path])
    console.log(path)
  }

  validarNombre(nombre:string){
    let respuesta = ""
    this.axiosService.request("POST",
      "/api/verificarNombre",
      {
        nombre: nombre
      }).then(response => {
        console.log(response.data.nombre);
        respuesta = response.data.nombre;
        if(respuesta == "true"){
          let numeroAleatorio = Math.random();
          let numeroEnRango = Math.floor(numeroAleatorio * (1000000 - 1)) + 1;
          window.localStorage.setItem("numbervm", numeroEnRango.toString());
        }
    });
  }
}
