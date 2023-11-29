import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AxiosService} from "../../Services/axios/axios.service";
import {MaquinaVirtualModule} from "../../Modules/maquinavirtual/maquinavirtual.module";
import {HttpClient} from "@angular/common/http";
import {AlertService} from "../../Services/alert/alert.service";
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
import {UsuarioService} from "../../Services/usuario/usuario.service";
import {JwtService} from "../../Services/jwt.service";
import {MaquinavirtualService} from "../../Services/maquinavirtual/maquinavirtual.service";
import {Tipomaquina} from "../../Modules/tipomaquina/tipomaquina";
import {TipomaquinaService} from "../../Services/tipomaquina/tipomaquina.service";

@Component({
  selector: 'app-createvm',
  templateUrl: './createvm.component.html',
  styleUrls: ['./createvm.component.css']
})
export class CreatevmComponent implements OnInit {

  public habilitar: boolean = true;
  public sistemasOperativos!: Array<any>;
  public sistemaOperativo: any;
  public tiposMV!: Array<Tipomaquina>

  userUnlogged: UsuarioModule = {
    nombre: '',
    apellidos: 'unlogged',
    correo: 'unlogged' + window.localStorage.getItem("numbervm"),
    tipousuario: '4',
    contrasenia: 'unlogged'
  }

  constructor(private router: Router, private axiosService: AxiosService, private http: HttpClient, private usuarioService: UsuarioService, private decoder: JwtService, private alertService: AlertService, private maquinaService: MaquinavirtualService, private tipoMaquinaService: TipomaquinaService) {
  }

  ngOnInit() {
    this.maquinaService.getOSs().then(value => {
      this.sistemasOperativos = value.data;
    });

    this.tipoMaquinaService.getTipos().then(val => {
      this.tiposMV = val.data;
    });
  }

  async conectar(tipomaquina: Tipomaquina) {
    if (!this.axiosService.getAuthToken()) {
      this.usuarioService.crearUsuario(this.userUnlogged);
      await new Promise(f => setTimeout(f, 1000));
    }
    let newVM: MaquinaVirtualModule = {
      nombre: tipomaquina.nombre,
      idUser: -1,
      estado: 'Procesando',
      idMF: -1,
      tipoMV: tipomaquina.nombre,
      ip: '',
      hostname: ''
    }
    let token: any = this.decoder.DecodeToken(this.axiosService.getAuthToken()!);
    let nombre = newVM.nombre + localStorage.getItem("numbervm")!;
    let disco:string = this.sistemaOperativo.nombre.replace(' ', '');
    newVM.idUser = token.id;
    this.validarNombre(nombre);
    this.validarNumeroMaquinas(token.id);
    //this.alertService.showError("Aviso", "Se ha creado una máquina virtual", 3000);
    return this.http.post(
      window.localStorage.getItem("ipsolic")! + "/procSolic", {
        nombre: newVM.nombre,
        ip: "Unasigned",
        hostname: newVM.hostname,
        idUser: newVM.idUser,
        contrasenia: "1234",
        tipoMV: newVM.tipoMV,
        idMF: newVM.idMF,
        estado: newVM.estado,
        solicitud: "create",
        numeroNombre: window.localStorage.getItem("numbervm"),
        sistemaOperativo: this.sistemaOperativo.id,
        nombreDisco:disco
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
      }
    ).subscribe({
        next: () => {
          let numeroAleatorio = Math.random();
          let numeroEnRango = Math.floor(numeroAleatorio * (1000000 - 1)) + 1;
          window.localStorage.setItem("numbervm", numeroEnRango.toString());
        }
      }
    );

  }

  navig(path: string) {
    this.router.navigate([path])
  }

  validarNombre(nombre: string) {
    let respuesta = ""
    this.axiosService.request("POST",
      "/api/verificarNombre",
      {
        nombre: nombre
      }).then(response => {
      respuesta = response.data.nombre;
      if (respuesta == "true") {
        let numeroAleatorio = Math.random();
        let numeroEnRango = Math.floor(numeroAleatorio * (1000000 - 1)) + 1;
        window.localStorage.setItem("numbervm", numeroEnRango.toString());
      }
    });
  }

  validarNumeroMaquinas(id: number): Promise<any> {
    return this.axiosService.request(
      "POST",
      window.localStorage.getItem("urlapi")! + "/api/getvms",
      id
    );
  }
  habilitarBoton() {
    // Verificar si se seleccionó una opción
    this.habilitar = this.sistemaOperativo !== '';
  }
}
