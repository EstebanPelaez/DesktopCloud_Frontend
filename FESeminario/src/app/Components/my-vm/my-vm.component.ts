import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
@Component({
  selector: 'app-my-vm',
  templateUrl: './my-vm.component.html',
  styleUrls: ['./my-vm.component.css']
})
export class MyVMComponent {
  select = [false, false];
  constructor(private router: Router) {
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

  navig  (path:string){
    this.router.navigate([path])
    console.log(path)
  }
}
