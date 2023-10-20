import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:8080/api/usuarios';
  constructor(private http: HttpClient) { }

  saveUsuario(usuario :UsuarioModule):Observable<any>{
    return this.http.post(this.url, usuario);
  }
}
