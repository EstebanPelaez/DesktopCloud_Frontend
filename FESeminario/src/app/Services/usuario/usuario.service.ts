import {Injectable, OnInit} from '@angular/core';
import {AxiosService} from "../axios/axios.service";
import {Router} from "@angular/router";
import {JwtService} from "../jwt.service";
import {UsuarioModule} from "../../Modules/usuario/usuario.module";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements OnInit{
  infoToken:any;
  nombre:any;
  constructor(private axiosService:AxiosService, private router:Router, private decoder:JwtService) {
  }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(): Promise<any>{
    let token:any = this.decoder.DecodeToken(this.axiosService.getAuthToken()!);
    return this.axiosService.request(
      "POST",
      "/api/getUser",
      token.id);
  }

  setUsuarioActual(name: string){
    console.log("OAIGFOSIUHOUGLJASUGHOUASIh "+name)
    this.nombre = name;
  }

  getUsuarioActual(): string{
    console.log(this.nombre)
    return this.nombre;
  }




}
