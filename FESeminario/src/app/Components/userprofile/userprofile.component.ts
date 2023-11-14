import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
import {UsuarioService} from "../../Services/usuario/usuario.service";
import {AlertService} from "../../Services/alert/alert.service";
import {AxiosService} from "../../Services/axios/axios.service";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit{

  user:UsuarioModule={nombre:'', apellidos:'', contrasenia:'', correo:'', tipousuario:''}
  constructor(private axiosService: AxiosService, private router: Router, private usuarioService:UsuarioService, private alertService: AlertService ) {

  }
  ngOnInit(): void {

    console.log(this.usuarioService);
    this.usuarioService.getUsuario().then(response => {
      this.user.nombre = response.data.nombre;
      this.user.apellidos = response.data.apellidos;
      this.user.correo = response.data.correo;
      this.user.contrasenia = response.data.contrasenia;
    });
  }
  navig  (path:string){

    this.router.navigate([path])
    console.log(path)
  }

}
