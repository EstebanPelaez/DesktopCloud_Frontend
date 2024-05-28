import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import {Router} from "@angular/router";
import {MaquinavirtualService} from "../../Services/maquinavirtual/maquinavirtual.service";
import {AxiosService} from "../../Services/axios/axios.service";
import {MaquinafisicaService} from "../../Services/maquinafisica/maquinafisica.service";
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements  OnInit{

  public lista!: Array<any>;
  public maquinasFisicas!: Array<any>;
  public maquina: any;
  ip:string = localStorage.getItem('ipmoni')!;
  url= "http://"+ this.ip +":3000/d-solo/Kdh0OoSGz22/8c320a1c-d2b8-58c8-9b62-a8ecca1c4c1f?orgId=1&refresh=10s&editIndex=0&theme=light&panelId=56"
  public selected = true;
  public dashBtnClass = "selected";
  public pmBtnClass = "";
  constructor(private router: Router, private maquinaService: MaquinafisicaService, private axiosService: AxiosService, protected _sanitizer: DomSanitizer) {
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
      });}

  switchBtnClass(){
    if (this.dashBtnClass == ""){
      this.dashBtnClass = "selected";
      this.pmBtnClass = "";
      this.selected = true;
    }else{
      this.dashBtnClass = "";
      this.pmBtnClass = "selected"
      this.selected = false;
    }
  }
  monitoringUrl(id: string){
    let url = "http://"+ this.ip +":3000/d-solo/Kdh0OoSGz22/8c320a1c-d2b8-58c8-9b62-a8ecca1c4c1f?orgId=1&refresh=10s&editIndex=0&theme=light&panelId="+id
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  monitoringUrlTotal(){
    let url = "http://"+this.ip+":3000/d-solo/Kdh0OoSGz22/dashboard-for-the-desktop-cloud-platform?orgId=1&refresh=10s&theme=light&panelId=45"
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
