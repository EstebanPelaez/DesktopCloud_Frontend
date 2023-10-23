import {Component, OnInit} from '@angular/core';
import * as jwt_decode from "jwt-decode";
import {AxiosService} from "../../Services/axios/axios.service";
import {JwtService} from "../../Services/jwt.service";
import {UsuarioService} from "../../Services/usuario/usuario.service";
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarnComponent implements OnInit{

  user:UsuarioModule={nombre:'', apellidos:'', contrasenia:'', correo:'', tipousuario:'1'}
  constructor(private usuarioService:UsuarioService, private axiosService:AxiosService, private decoder:JwtService) {
    console.log("Constructor")
    //this.nombre = this.usuarioService.getUsuarioActual()
  }

  ngOnInit(): void {
    this.usuarioService.getUsuario().then(response => {
      this.user.nombre = response.data.nombre;
    });
    console.log("INIT")
  }

  prueba():string{
    return this.usuarioService.getUsuarioActual();
  }


}
