import { Injectable } from '@angular/core';
import {AxiosService} from "../axios/axios.service";

@Injectable({
  providedIn: 'root'
})
export class TipomaquinaService {

  constructor(private axiosService:AxiosService) { }

  getTipos():Promise<any> {
    return this.axiosService.request(
      "GET",
      "/api/getTiposMaquina",
      ""
    )
  }
}
