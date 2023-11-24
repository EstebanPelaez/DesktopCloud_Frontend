import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSource = new Subject();
  private confirmSource = new Subject();
  alert$ = this.alertSource.asObservable();
  confirm$ = this.alertSource.asObservable();

  constructor() { }

  showError(message: string, description: string, time: number = 5000){
    this.alertSource.next({message, description ,time});
  }
}

