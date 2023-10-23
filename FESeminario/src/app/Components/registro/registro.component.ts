import { Component } from '@angular/core';
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
import {Router} from "@angular/router";
import {AxiosService} from "../../Services/axios/axios.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  newUser:UsuarioModule={nombre:'', apellidos:'', contrasenia:'', correo:'', tipousuario:'1'}
  constructor(private axiosService:AxiosService, private router:Router) {  }
  agregarUsuario(){
    this.axiosService.request(
      "POST",
      "/api/register",
      {
        nombre: this.newUser.nombre,
        apellidos: this.newUser.apellidos,
        contrasenia: this.newUser.contrasenia,
        correo: this.newUser.correo,
        tipousuario: this.newUser.tipousuario
      }
    ).then(response => {
      this.axiosService.setAuthToken(response.data.token);
      this.router.navigate(['/createvm'])
    });
    //this.router.navigate(["/inicio"]);
  }
}
