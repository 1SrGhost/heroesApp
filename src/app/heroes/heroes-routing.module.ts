import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [ {
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'listado',
      component: ListadoComponent,
    },
    {
      path: 'agregar',
       component: AgregarComponent,
    },
    {
      path: 'editar/:id',
       component: AgregarComponent,
    },
    {
      path: 'buscar',
       component: BuscarComponent,
    },
    {
      path: ':id',
       component: HeroeComponent,
    },
    {
      path: '**',
       redirectTo: 'listado'
    },
  ]
}
 
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports:[
    RouterModule
  ]
})
export class HeroesRoutingModule { }
