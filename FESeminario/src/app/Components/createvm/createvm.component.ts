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

  newVM2: MaquinaVirtualModule = {
    nombre: 'debian',
    ip: 'No asignada',
    hostname: '',
    idUser: 1,
    estado: 'Apagada',
    idMF: 0,
    tipoMV: 2
  };

  userUnlogged: UsuarioModule = {
    nombre: '',
    apellidos: 'unlogged',
    correo: 'unlogged'+window.localStorage.getItem("numbervm"),
    tipousuario: '4',
    contrasenia: 'unlogged'}

  constructor(private router: Router, private axiosService: AxiosService, private http: HttpClient, private usuarioService: UsuarioService, private decoder:JwtService, private alertService: AlertService) {
  }


  async conectar(newVM: MaquinaVirtualModule) {
    if (!this.axiosService.getAuthToken()) {
      this.usuarioService.crearUsuario(this.userUnlogged);
      await new Promise(f => setTimeout(f, 1000));
    }
    let token: any = this.decoder.DecodeToken(this.axiosService.getAuthToken()!);
    let numeroMaquinas = 0;
    this.validarNumeroMaquinas(token.id).then(result => {
      numeroMaquinas = result.data.length
    });
    await new Promise(f => setTimeout(f, 1000));
    if(token.apellidos == "unlogged" && numeroMaquinas>=1){
      this.alertService.showError("Error", "Para crear más máquinas virtuales, inicie sesión",3000);
      return undefined;
    }else {
      newVM.idUser = token.id;
      let nombre = this.newVM1.nombre + localStorage.getItem("numbervm")!;
      this.validarNombre(nombre);
      this.validarNumeroMaquinas(token.id);
      this.alertService.showError("Aviso", "Se ha creado una máquina virtual",3000);
      return this.http.post(
        window.localStorage.getItem("ipsolic")!+"/procSolic", {
          nombre: newVM.nombre,
          ip: "Unasigned",
          hostname: newVM.hostname,
          idUser: newVM.idUser,
          contrasenia: "1234",
          tipoMV: newVM.tipoMV,
          idMF: newVM.idMF,
          estado: newVM.estado,
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
  }

  navig(path: string) {
    this.router.navigate([path])
  }

  validarNombre(nombre:string){
    let respuesta = ""
    this.axiosService.request("POST",
      "/api/verificarNombre",
      {
        nombre: nombre
      }).then(response => {
        respuesta = response.data.nombre;
        if(respuesta == "true"){
          let numeroAleatorio = Math.random();
          let numeroEnRango = Math.floor(numeroAleatorio * (1000000 - 1)) + 1;
          window.localStorage.setItem("numbervm", numeroEnRango.toString());
        }
    });
  }

  validarNumeroMaquinas(id:number):Promise<any>{
    return this.axiosService.request(
      "POST",
      window.localStorage.getItem("urlapi")!+"/api/getvms",
      id
      );
  }
}
