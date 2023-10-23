import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../Services/usuario/usuario.service";
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  user:UsuarioModule={nombre:'', apellidos:'', contrasenia:'', correo:'', tipousuario:'1'}
  constructor(private usuarioService:UsuarioService) {
  }

  ngOnInit(): void {
    this.usuarioService.getUsuario().then(response => {
      this.user.nombre = response.data.nombre;
    });
    console.log("USERNAME "+this.user.nombre)
  }
}
