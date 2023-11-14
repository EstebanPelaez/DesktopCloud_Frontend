import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../Services/usuario/usuario.service";
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
import {AxiosService} from "../../Services/axios/axios.service";
import {Router} from "@angular/router";
import {AlertService} from "../../Services/alert/alert.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  user:UsuarioModule={nombre:'', apellidos:'', contrasenia:'', correo:'', tipousuario:''}
  constructor(private usuarioService:UsuarioService, private axiosService:AxiosService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    if(this.axiosService.getAuthToken()){
      this.usuarioService.getUsuario().then(response => {
          this.user.nombre = response.data.nombre;
          this.user.tipousuario = response.data.tipousuario
      }).catch(error =>{
        if (error.response.data.message == "Sesion expirada"){
          this.alertService.showError("Aviso", "Su sesión ha expirado, por favor inicie sesión nuevamente.",4000);
          this.axiosService.setAuthToken(null);
        }
        });
    }
  }

  isLogged():boolean{
    return this.user.nombre != '';
  }
}
