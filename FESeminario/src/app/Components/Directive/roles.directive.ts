import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {UsuarioService} from "../../Services/usuario/usuario.service";
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
import {AxiosService} from "../../Services/axios/axios.service";
import {JwtService} from "../../Services/jwt.service";

@Directive({
  selector: '[appRoles]'
})
export class RolesDirective  implements OnInit{

  private user: UsuarioModule = {nombre: '', apellidos: '', contrasenia: '', correo: '', tipousuario: '3'}
  private permissions:string[] = [];

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private usuarioService: UsuarioService, private axiosService:AxiosService, private decoder:JwtService){

    if(axiosService.getAuthToken()){
      let token:any = this.decoder.DecodeToken(this.axiosService.getAuthToken()!);
      this.user.tipousuario = token.tipoUsuario;
    }else{
      this.user.tipousuario = '4';
    }

  }

  ngOnInit(): void {

  }

  @Input()
  set appRoles(val: Array<string>){
    console.log(' ****', val, this.user);
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.permissions = val;
    this.updateView();
  }

  private updateView(){
    this.viewContainer.clear();
    if(this.checkPermissions()){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private checkPermissions(): boolean {
    let hasPermission = false;
    if (this.user.tipousuario) {
      this.permissions.forEach(permission => {
        if (permission == this.user.tipousuario) {
          hasPermission = true;
          // Si se encuentra una coincidencia, puedes detener el bucle
          // break;
        }
      });
    }
    return hasPermission;
  }
}


