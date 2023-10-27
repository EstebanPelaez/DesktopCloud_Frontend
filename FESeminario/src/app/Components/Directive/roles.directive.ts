import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {UsuarioService} from "../../Services/usuario/usuario.service";
import {UsuarioModule} from "../../Modules/usuario/usuario.module";

@Directive({
  selector: '[appRoles]'
})
export class RolesDirective  implements OnInit{

  private user: UsuarioModule = {nombre: '', apellidos: '', contrasenia: '', correo: '', tipousuario: '2'}
  private permissions:string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    console.log(this.usuarioService);
    this.usuarioService.getUsuario().then(res => {
      this.user.tipousuario = res.data.tipousuario;
    });
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
        if(this.permissions[0] === this.user.tipousuario){
            hasPermission=true;
        }
    }
    return hasPermission;
  }
}


