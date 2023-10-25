import {UsuarioModule} from "../usuario/usuario.module";

export interface MaquinaVirtualModule {
  nombre:string;
  ip:string;
  hostname:string;
  idUser:number;
  estado:string;
  idMF: number;
  tipoMV: number;
}
