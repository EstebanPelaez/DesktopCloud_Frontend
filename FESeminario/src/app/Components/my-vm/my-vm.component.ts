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
  iniciada: boolean = true;
  apagada: boolean = true;
  state: string = "";
  buttonText = "Iniciar";
  nuevoEstado = "";


  constructor(private axiosService: AxiosService, private router: Router, private maquinaService: MaquinavirtualService, private http: HttpClient) {

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

    })
  }

  navig(path: string) {
    this.router.navigate([path]);
    console.log(path);
  }

  iniciarVM(vm: any) {
    this.cambiarEstado(vm);
    return this.http.post(
      "http://localhost:8000/solicitud", {
        "solicitud": this.state,
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

  cambiarEstado(vm: any) {
    setTimeout(() => {

      this.axiosService.request(
        "POST",
        "/api/updatevms",
        {
          estado: this.nuevoEstado,
          id: vm.id

        }
      ).then(response => {

        window.location.reload();
      });
    }, 2000);
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
        "nombre": vm.nombre
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

  protected readonly parseInt = parseInt;
}
