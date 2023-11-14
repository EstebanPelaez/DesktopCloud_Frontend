import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {MaquinavirtualService} from "../../Services/maquinavirtual/maquinavirtual.service";
import {AxiosService} from "../../Services/axios/axios.service";
import {MaquinafisicaService} from "../../Services/maquinafisica/maquinafisica.service";

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements  OnInit{

  public lista!: Array<any>;
  public maquinasFisicas!: Array<any>;
  public maquina: any;
  constructor(private router: Router, private maquinaService: MaquinafisicaService, private axiosService: AxiosService) {
  }

  ngOnInit() {
    this.maquinaService.getMFs().then(value => {
      this.maquinasFisicas = value.data;
    });
  }

  getMaquinasVirtualesMF(maquina: any): Promise<any>{
    return this.axiosService.request(
      "POST",
      "/api/getvmspm",
      maquina.idMF).then(response => {
      console.log(response.data)
      this.lista = response.data;
      });
  }
}
