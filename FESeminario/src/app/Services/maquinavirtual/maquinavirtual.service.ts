import { Injectable } from '@angular/core';
import {AxiosService} from "../axios/axios.service";
import {Router} from "@angular/router";
import {JwtService} from "../jwt.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MaquinavirtualService {
  nombre:any;
  estadoVM: string|undefined;
  constructor(private axiosService:AxiosService, private router:Router, private decoder:JwtService, private http: HttpClient) {
  }

  getMaquinasVirtuales(): Promise<any>{
    let token:any = this.decoder.DecodeToken(this.axiosService.getAuthToken()!);
    return this.axiosService.request(
      "POST",
      "/api/getvms",
      token.id);
  }

  getVM(idVM:string):Promise<any>{
    return this.axiosService.request(
      "POST",
      "/api/getvm",
      idVM);
  }
  cambiarEstado(): Promise<any>{
    let token:any = this.decoder.DecodeToken(this.axiosService.getAuthToken()!);
    return this.axiosService.request(
      "POST",
      "/api/updatevms",
      token.id);
  }
  crearVM(){
    return this.http.post(
      "POST",
      "http://localhost:8000/crearmv",
      {
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  }

  solicitarCambioVM(vm:any, request:string){
    this.http.post(
      "http://localhost:8000/solicitud", {
        "id": vm.id,
        "solicitud": request,
        "nombre": vm.nombre,
        "idmf": vm.mfisica.idMF
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    ).subscribe({
      next: (result:any) =>{
        this.estadoVM = result;
      }
    })
  }

  setEstado(vm:any):string{
    this.estadoVM = vm.estado
    return vm.estado;
  }
}
