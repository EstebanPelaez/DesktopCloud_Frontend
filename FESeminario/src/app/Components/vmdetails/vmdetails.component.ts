import {Component, Input, OnInit} from '@angular/core';
import {MaquinavirtualService} from "../../Services/maquinavirtual/maquinavirtual.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vmdetails',
  templateUrl: './vmdetails.component.html',
  styleUrls: ['./vmdetails.component.css']
})
export class VmdetailsComponent implements OnInit{
  @Input() idVM:any;
  vm:any
  show: boolean = false
  constructor(public maquinaService: MaquinavirtualService, private router:Router) {
  }
  ngOnInit(): void {
    this.getVM();
    this.resizeInput();
  }
  getVM(){
    this.maquinaService.getVM(this.idVM).then(value => {
      this.vm = value.data;
      console.log(value.data);
    });
  }

  copy(){
    navigator.clipboard.writeText(document.getElementById("ssh-connection")!.innerText)
  }

  close(){
    window.location.reload();
  }

  switchPass(){
    this.show = !this.show;
  }

  resizeInput(){
    let input = document.getElementById("input-pass")!;
    input.style.width = input.nodeValue!.length+"ch";
  }
}
