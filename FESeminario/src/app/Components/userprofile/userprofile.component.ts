import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
import {UsuarioService} from "../../Services/usuario/usuario.service";
import {AlertService} from "../../Services/alert/alert.service";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit{

  user:UsuarioModule={nombre:'', apellidos:'', contrasenia:'', correo:'', tipousuario:'1'}
  select = [false, false, false, false];
  constructor(private router: Router, private usuarioService:UsuarioService, private alertService: AlertService ) {
    this.select = [true, false, false, false];
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        console.log("EVENT", event)
        switch (event.urlAfterRedirects){
          case "/":
            this.select = [false, false, false, false];break;
          case "/userprofile":
            this.select = [true, false, false, false];break;
          case "/my-vm":
            this.select = [false, true, false, false];break;
          case "/addpm":
            this.select = [false, false, true, false];break;
          case "/my-vm":
            this.select = [false, false, false, true];break;
          default:
            this.select = [true, false, false, false]; break;
        }
      }
    })

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
