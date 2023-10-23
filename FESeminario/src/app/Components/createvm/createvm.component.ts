import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-createvm',
  templateUrl: './createvm.component.html',
  styleUrls: ['./createvm.component.css']
})
export class CreatevmComponent {

  constructor(private router: Router) {

  }

  navig  (path:string) {
    this.router.navigate([path])
    console.log(path)
  }
}
