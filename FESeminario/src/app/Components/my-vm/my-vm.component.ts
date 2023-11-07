import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AxiosService} from "../../Services/axios/axios.service";
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
import {MaquinavirtualService} from "../../Services/maquinavirtual/maquinavirtual.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-my-vm',
  templateUrl: './my-vm.component.html',
  styleUrls: ['./my-vm.component.css']
})
export class MyVMComponent implements OnInit {

  public lista!: Array<any>;
  user: UsuarioModule = {nombre: '', apellidos: '', contrasenia: '', correo: '', tipousuario: '1'}
  select = [false, false, false, false];
  nuevoEstado = "";
  detailsFlag = false;
  selectedVM: number|undefined;
  constructor(private axiosService: AxiosService, private router: Router, public maquinaService: MaquinavirtualService, private http: HttpClient) {

    this.select = [true, false, false, false];
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log("EVENT", event)
        switch (event.urlAfterRedirects) {
          case "/":
            this.select = [false, false, false, false];
            break;
          case "/userprofile":
            this.select = [true, false, false, false];
            break;
          case "/my-vm":
            this.select = [false, true, false, false];
            break;
          case "/addpm":
            this.select = [false, false, true, false];
            break;
          case "/my-vm":
            this.select = [false, false, false, true];
            break;
          default:
            this.select = [true, false, false, false];
            break;
        }
      }
    })
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

      window.location.reload();
    });
  }

  eliminarVM(vm: any) {
    this.eliminarDB(vm);
    return this.http.post(
      "http://localhost:8000/solicitud", {
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
        }
      }
    )
  }

  showDetails(idmv:any){
    this.detailsFlag = true;
    this.selectedVM = idmv;
    console.log(this.selectedVM)
  }

  logout(){
    this.axiosService.setAuthToken(null);
    this.router.navigate(["/home"]);
  }

}
