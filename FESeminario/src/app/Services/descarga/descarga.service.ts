import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DescargaService {

  constructor(private http: HttpClient) { }

  descargarArchivo(url:string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }
}
