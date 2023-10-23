import {UsuarioModule} from "../usuario/usuario.module";

export interface MaquinaVirtualModule {
  id:string;
  nombre:string;
  ip:string;
  hostname:string;
  userId:string;
  estado:string;
}
