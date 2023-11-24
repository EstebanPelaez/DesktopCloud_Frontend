import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {
  }

  navig(path: string) {
    this.router.navigate([path]);
    console.log(path);
  }
  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }
}
