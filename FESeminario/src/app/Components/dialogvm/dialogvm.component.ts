import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AlertService} from "../../Services/alert/alert.service";
import {MaquinavirtualService} from "../../Services/maquinavirtual/maquinavirtual.service";

@Component({
  selector: 'app-dialogvm',
  templateUrl: './dialogvm.component.html',
  styleUrls: ['./dialogvm.component.css']
})
export class DialogvmComponent implements OnInit{
  @Input() myVm:any;
  @Output() myVmo: any;
  @Output() newItemEvent = new EventEmitter<any>();
  @Output() newEvent = new EventEmitter<boolean>();
  constructor(private router:Router, private alertService:AlertService) {
  }
  addNewItem() {
    console.log(this.myVm)
    this.newItemEvent.emit(this.myVm);
  }

  confirm(flag: boolean){
    this.newEvent.emit(flag);
    this.addNewItem();
  }
  ngOnInit() {
    this.resizeOutput();
  }

  close(){
    this.alertService.showError("Aviso", "Se ha Eliminado una máquina virtual",3000);
  }

  resizeOutput(){
    let output = document.getElementById("output-pass")!;
    output.style.width = output.nodeValue!.length+"ch";
  }
}
