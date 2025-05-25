import { Routes } from '@angular/router';
import { Punto1Component } from './components/punto1/punto1.component';
import { Punto2Component } from './components/punto2/punto2.component';
import { Punto3Component } from './components/punto3/punto3.component';
import {
  TicketsComponent
} from './components/tickets/tickets.component';
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
    component: TicketsComponent,
  }
];
