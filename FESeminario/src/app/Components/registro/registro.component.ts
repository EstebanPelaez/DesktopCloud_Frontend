import { Component } from '@angular/core';
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
import {UsuarioService} from "../../Services/UsuarioService/usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  newUser:UsuarioModule={nombre:'', apellidos:'', contrasenia:'', correo:'', tipousuario:'1'}
  constructor(private usuarioService:UsuarioService, private router:Router) {  }
  agregarUsuario(){
    this.usuarioService.saveUsuario(this.newUser).subscribe({
      next: (result:any) =>{
        this.router.navigate(['/'])
      },
      error:(err:any)=>console.log(err)
    });
  }
}
