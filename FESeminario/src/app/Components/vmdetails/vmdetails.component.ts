import { Component, Input } from '@angular/core';
import {MaquinavirtualService} from "../../Services/maquinavirtual/maquinavirtual.service";

@Component({
  selector: 'app-vmdetails',
  templateUrl: './vmdetails.component.html',
  styleUrls: ['./vmdetails.component.css']
})
export class VmdetailsComponent {
  @Input() idMV:any;
  constructor(public maquinaService: MaquinavirtualService) {
    console.log("aAADsafa"+this.idMV);
  }
}
