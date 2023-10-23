import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  DecodeToken(token:string): string{
    console.log("DECODING: "+token)
    return jwtDecode(token);
  }
}
