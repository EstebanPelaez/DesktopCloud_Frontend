import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MaquinafisicaModule {

  adaptador:string;
  cpu:number;
  hostname:string;
  ip:string;
  os:string;
  ram: number;
  almacenamiento: number;
}
