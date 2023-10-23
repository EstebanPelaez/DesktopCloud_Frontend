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
export class NavbarComponent {



}
