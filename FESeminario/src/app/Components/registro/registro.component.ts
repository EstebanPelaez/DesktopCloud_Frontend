import { Component } from '@angular/core';
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
import {Router} from "@angular/router";
import {AxiosService} from "../../Services/axios/axios.service";
import {AlertService} from "../../Services/alert/alert.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  newUser:UsuarioModule={nombre:'', apellidos:'', contrasenia:'', correo:'', tipousuario:''}
  constructor(private axiosService:AxiosService, private router:Router, private alertService:AlertService) {  }
  agregarUsuario(){
    this.setTipoUsuario(this.newUser.tipousuario);
    console.log(this.newUser.tipousuario)
    this.axiosService.request(
      "POST",
      "/api/register",
      {
        nombre: this.newUser.nombre,
        apellidos: this.newUser.apellidos,
        contrasenia: this.newUser.contrasenia,
        correo: this.newUser.correo,
        tipoUsuario: this.newUser.tipousuario
      }
    ).then(response => {
      this.axiosService.setAuthToken(response.data.token);
      this.router.navigate(['/home']);
      this.alertService.showError("Aviso", this.newUser.nombre+" Ahora eres parte del Desktop Cloud", 3000);
    });}

  setTipoUsuario(tipoUsuario:string){
    if(tipoUsuario == 'Estudiante'){
      this.newUser.tipousuario = '2';
    }else {
      this.newUser.tipousuario = '3'
    }
  }

  navig(path: string) {
    this.router.navigate([path]);
    console.log(path);
  }
}
