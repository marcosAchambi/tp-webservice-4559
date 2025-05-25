import { Routes } from '@angular/router';
import { Punto1Component } from './components/punto1/punto1.component';
import { Punto2Component } from './components/punto2/punto2.component';
import { Punto3Component } from './components/punto3/punto3.component';
import {
  Punto4Component
} from './components/punto4/punto4.component';
export const routes: Routes = [
  {
    path: 'puntoA',
    component: Punto1Component,
  },
  {
    path: 'puntoB',
    component: Punto2Component,
  },
  {
    path: 'puntoC',
    component: Punto3Component,
  },
  {
    path: 'puntoD',
    component: Punto4Component,
  }
];
