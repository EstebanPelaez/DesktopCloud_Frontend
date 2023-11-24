import {Component, OnInit} from '@angular/core';
import {AlertService} from "./Services/alert/alert.service";
import {config, debounce, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

interface AppConfig {
  api: string;
  servidor: string;
}

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
  constructor(private alertService: AlertService, private http: HttpClient) {

  }


  ngOnInit(): void {
    if (window.localStorage.getItem("numbervm") == null){
      let numeroAleatorio = Math.random();
      let numeroEnRango = Math.floor(numeroAleatorio * (1000000 - 1)) + 1;
      window.localStorage.setItem("numbervm", numeroEnRango.toString());
    }
    //if(localStorage.getItem('ipapi')==null){
      let config = this.http.get<AppConfig>('assets/ips.json');
      config.subscribe(config => {
        localStorage.setItem('urlapi', config.api);
        localStorage.setItem('ipsolic', config.servidor);
      });
    //}
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
