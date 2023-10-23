import { Component, EventEmitter, Output } from '@angular/core';
import {Router} from "@angular/router";
import {AxiosService} from "../../Services/axios/axios.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private axiosService:AxiosService, private router:Router) {  }
  user: string = "";
  password: string = "";


  login(){
    this.axiosService.request(
      "POST",
      "/api/login",
      {
        correo :this.user,
        password: this.password
      }
    ).then(response => {
      this.axiosService.setAuthToken(response.data.token);
      console.log("LOGIN "+response.data.token)
    })
  }
  navig  (path:string) {
    this.router.navigate([path])
    console.log(path)
  }
}
