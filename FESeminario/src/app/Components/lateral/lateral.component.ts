import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AxiosService} from "../../Services/axios/axios.service";

@Component({
  selector: 'app-lateral',
  templateUrl: './lateral.component.html',
  styleUrls: ['./lateral.component.css']
})
export class LateralComponent {

  select = [false, false, false, false];
  constructor(private router: Router, private axiosService:AxiosService) {

    this.select = [true, false, false, false];
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        console.log("EVENT", event)
        console.log(event.urlAfterRedirects+" Aqui si entró")
        switch (event.urlAfterRedirects){
          case "/":
            this.select = [false, false, false, false];break;
          case "/userprofile":
            this.select = [true, false, false, false];break;
          case "/my-vm":
            this.select = [false, true, false, false];break;
          case "/addpm":
            this.select = [false, false, true, false];break;
          case "/monitoring":
            this.select = [false, false, false, true];break;
          default:
            this.select = [true, false, false, false]; break;
        }
      }
    })
  }

  navig  (path:string){
    this.router.navigate([path]);
    console.log(path);
  }

  logout(){
    this.axiosService.setAuthToken(null);
    this.router.navigate(["/home"]);
  }
}
