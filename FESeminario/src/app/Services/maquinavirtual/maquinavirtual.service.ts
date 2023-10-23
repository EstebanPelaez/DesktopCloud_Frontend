import { Injectable } from '@angular/core';
import {AxiosService} from "../axios/axios.service";
import {Router} from "@angular/router";
import {JwtService} from "../jwt.service";

@Injectable({
  providedIn: 'root'
})
export class MaquinavirtualService {
  infoToken:any;
  nombre:any;
  constructor(private axiosService:AxiosService, private router:Router) {
  }

  getMaquinasVirtuales(): Promise<any>{
    return this.axiosService.request(
      "POST",
      "/api/getvms",
      this.infoToken.id);
  }

  getMaquinasVirtuales2(): Promise<any>{
    return this.axiosService.request2(
      "POST",
      "/api/getvms",
      );
  }

  setUsuarioActual(name: string){
    console.log("Nombre"+name)
    this.nombre = name;
  }

  getUsuarioActual(): string{
    console.log(this.nombre)
    return this.nombre;
  }

  getVM():Promise<any>{
    return new Promise(function (resolve){
      var request="/getvms"

    })

  }
}
