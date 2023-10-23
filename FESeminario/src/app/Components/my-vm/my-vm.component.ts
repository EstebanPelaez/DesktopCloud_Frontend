import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AxiosService} from "../../Services/axios/axios.service";
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
import {MaquinavirtualService} from "../../Services/maquinavirtual/maquinavirtual.service";
import {UsuarioService} from "../../Services/usuario/usuario.service";
@Component({
  selector: 'app-my-vm',
  templateUrl: './my-vm.component.html',
  styleUrls: ['./my-vm.component.css']
})
export class MyVMComponent{

  public lista!: Array<any>;
  user:UsuarioModule={nombre:'', apellidos:'', contrasenia:'', correo:'', tipousuario:'1'}
  select = [false, false];
  constructor(private axiosService:AxiosService, private router: Router, private maquinaService:MaquinavirtualService, private usuarioService:UsuarioService) {

    this.select = [true, false];
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        console.log("EVENT", event)
        switch (event.urlAfterRedirects){
          case "/":
            this.select = [false, false];break;
          case "/userprofile":
            this.select = [true, false];break;
          case "/my-vm":
            this.select = [false, true];break;
          default:
            this.select = [true, false]; break;
        }
      }
    })
  }
  si(): void {
    console.log(this.usuarioService);
    this.usuarioService.getUsuario().then(response => {
      this.user.correo = response.data.correo;
      console.log("INIT" + this.user.correo);
    });

    this.axiosService.request(
      "POST",
      "/api/getvms",
      {
        userId:this.user.tipousuario,
      }
    ).then(response => {
      this.axiosService.setAuthToken(response.data.token);
      console.log("maquina"+response.data.token);
    })

  }
  navig  (path:string){
    this.router.navigate([path]);
    console.log(path);
  }
}
