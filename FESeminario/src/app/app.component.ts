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
  constructor(private alertService: AlertService) {

  }
  ngOnInit(): void {
    if (window.localStorage.getItem("numbervm") == null){
      window.localStorage.setItem("numbervm", "0")
    }
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
