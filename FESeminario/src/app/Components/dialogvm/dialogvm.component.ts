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
  constructor(public router:Router, private alertService:AlertService) {
  }
  addNewItem() {
    console.log(this.myVm)
    this.newItemEvent.emit(this.myVm);
  }

  confirm(flag: boolean){
    this.newEvent.emit(flag);
    this.addNewItem();
    //window.location.reload();
  }
  ngOnInit() {
    this.resizeOutput();
  }

  close(){
    window.location.reload();
  }

  resizeOutput(){
    let output = document.getElementById("output-pass")!;
    output.style.width = output.nodeValue!.length+"ch";
  }

  navig(path: string) {
    this.router.navigate([path]);
    console.log(path);
  }
}
