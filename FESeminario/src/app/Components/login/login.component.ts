import { Component, EventEmitter, Output } from '@angular/core';
import {Router} from "@angular/router";
import {AxiosService} from "../../Services/axios/axios.service";
import {AlertService} from "../../Services/alert/alert.service";
import {UsuarioService} from "../../Services/usuario/usuario.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private alertService: AlertService, private axiosService:AxiosService, private router:Router, private usuarioService:UsuarioService) {  }
  user: string = "";

  password: string = "";


  login(){
    this.axiosService.request(
      "POST",
      "/api/login",
      {correo :this.user,
        password: this.password}
    ).then(response => {

      this.axiosService.setAuthToken(response.data.token);
      this.router.navigate(['/home']);
      this.alertService.showError("Alerta",  "Bienvenido de nuevo a Destop Cloud.", 3000);

    });
  }

  navig(path: string) {
    this.router.navigate([path]);
    console.log(path);
  }
}
