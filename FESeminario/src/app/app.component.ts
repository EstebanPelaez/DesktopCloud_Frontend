import {Component, OnInit} from '@angular/core';
import {AlertService} from "./Services/alert/alert.service";
import {debounce} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FESeminario';

  showAlert = true;
  message = '';
  description = '';
  confirm = false;
  constructor(private alertService: AlertService) {

  }
  ngOnInit(): void {
    if (window.localStorage.getItem("numbervm") == null){
      let numeroAleatorio = Math.random();
      let numeroEnRango = Math.floor(numeroAleatorio * (1000000 - 1)) + 1;
      window.localStorage.setItem("numbervm", numeroEnRango.toString());
    }
    window.localStorage.setItem("ipapi", "10.0.48.216");
    window.localStorage.setItem("ipsolic", "10.0.48.216");

    this.alertService.confirm$.subscribe((ans: any) => {
      this.message = ans.message;
    })
    this.alertService.alert$.subscribe((res: any) => {
      this.message = res.message;
      this.description = res.description;
      setTimeout(() => {
        this.showAlert = false;
        location.reload();
      }, res.time)
    })


  }

  protected readonly debounce = debounce;
}
