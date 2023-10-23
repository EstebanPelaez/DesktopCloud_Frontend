import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AxiosService} from "../../Services/axios/axios.service";
import {JwtService} from "../../Services/jwt.service";
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
import {MaquinaVirtualModule} from "../../Modules/maquinavirtual/maquinavirtual.module";
import {MaquinavirtualService} from "../../Services/maquinavirtual/maquinavirtual.service";
@Component({
  selector: 'app-my-vm',
  templateUrl: './my-vm.component.html',
  styleUrls: ['./my-vm.component.css']
})
export class MyVMComponent implements OnInit{

  public lista!: Array<any>;
  vm:MaquinaVirtualModule={nombre:'', ip:'', id:'', hostname:'', userId:'', estado:''}
  select = [false, false];
  constructor(private axiosService:AxiosService, private router: Router, private maquinaService:MaquinavirtualService) {

    this.select = [true, false];
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        console.log("EVENT", event)
        switch (event.urlAfterRedirects){
          case "/":
            this.select = [false, false];break;
          case "/userprofile":
            this.select = [true, false];break;
          case "/my-vm":
            this.select = [false, true];break;
          default:
            this.select = [true, false]; break;
        }
      }
    })
  }
  ngOnInit(): void {
    this.maquinaService.getMaquinasVirtuales().then(res=>{
      this.lista=res;
      console.log("maquinas virtuales "+res)
    })
  }
  navig  (path:string){
    this.router.navigate([path])
    console.log(path)
  }
}
