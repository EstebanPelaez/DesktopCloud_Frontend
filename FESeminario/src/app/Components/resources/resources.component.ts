import { Component } from '@angular/core';
import {DescargaService} from "../../Services/descarga/descarga.service";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent {
  constructor(private descargaService: DescargaService) {
  }
  descargar(url:string, nombre:string){
    this.descargaService.descargarArchivo(url).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });

      // Crear un enlace de descarga
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = nombre; // Puedes cambiar el nombre del archivo
      document.body.appendChild(a);

      // Iniciar la descarga
      a.click();

      // Liberar el objeto URL
      window.URL.revokeObjectURL(url);

      // Eliminar el enlace
      document.body.removeChild(a);
    });
  }
}
