import {Component, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AxiosService} from "../../Services/axios/axios.service";
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
import {MaquinavirtualService} from "../../Services/maquinavirtual/maquinavirtual.service";
import {HttpClient} from "@angular/common/http";
import {AlertService} from "../../Services/alert/alert.service";

@Component({
  selector: 'app-my-vm',
  templateUrl: './my-vm.component.html',
  styleUrls: ['./my-vm.component.css']
})
export class MyVMComponent implements OnInit {

  @Input() myVM:any;
  public lista!: Array<any>;
  user: UsuarioModule = {nombre: '', apellidos: '', contrasenia: '', correo: '', tipousuario: '1'}
  nuevoEstado = "";
  detailsFlag = false;
  confirmFlag = false;
  selectedVM: number|undefined;
  vm: any | undefined;
  constructor(private axiosService: AxiosService, private router: Router, public maquinaService: MaquinavirtualService, private http: HttpClient, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.maquinaService.getMaquinasVirtuales().then(value => {
      this.lista = value.data;
      console.log(value.data);
    });


  }

  navig(path: string) {
    this.router.navigate([path]);
    console.log(path);
  }

  iniciarVM(vm: any) {
    let request: string;
    vm.estado=="Iniciada"?request = "finish" : request = "start";
    if(request == "start"){
      this.alertService.showError("Aviso", "Se está iniciando la máquina virtual",3000);
    }else{
      this.alertService.showError("Aviso", "Deteniendo la máquina virtual",3000);
    }
    this.maquinaService.solicitarCambioVM(vm, request);
  }


  eliminarDB(vm: any){
    this.axiosService.request(
      "DELETE",
      "/api/deletevm",
      {
        estado: this.nuevoEstado,
        id: vm.id,
        "idmf": vm.mfisica.idMF
      }
    ).then(response => {
    });
  }

  eliminarVM(vm: any){
    this.alertService.showError("Aviso", "Se ha Eliminado una máquina virtual",2000);
    this.eliminarDB(vm);
    return this.http.post(
      window.localStorage.getItem("ipsolic")!+"/procSolic", {
        "solicitud": "delete",
        "nombre": vm.nombre,
        "idmf": vm.mfisica.idMF
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    ).subscribe({
        next: (result: any) => {
          console.log(result);
          this.alertService.showError("Aviso", "Se ha Eliminado una máquina virtual",2000);
        }
      }
    )
  }

  showDetails(idmv:any){
    this.detailsFlag = true;
    this.selectedVM = idmv;
    console.log(this.selectedVM)
  }

  showComfirm(vm:any){
    this.confirmFlag = true;
    this.vm = vm;
  }

  addItem(vam:any){
    console.log(vam);
    this.vm = vam;
  }

  confirm(flag:boolean){
    console.log(flag);
    if(flag==true){
      this.confirmFlag = true;
      this.eliminarVM(this.vm);
    }
     this.confirmFlag = false;
  }

}
