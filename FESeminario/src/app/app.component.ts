import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FESeminario';
  ngOnInit(): void {
    if (window.localStorage.getItem("numbervm") == null){
      window.localStorage.setItem("numbervm", "0")
    }
  }
}
