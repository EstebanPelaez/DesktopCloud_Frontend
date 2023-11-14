import { Injectable } from '@angular/core';
import {AxiosService} from "../axios/axios.service";

@Injectable({
  providedIn: 'root'
})
export class MaquinafisicaService {

  constructor(private axiosService:AxiosService) { }

  getMFs():Promise<any>{
    return this.axiosService.request(
      "GET",
      "/api/getmfs",
      ""
    )
  }
}


