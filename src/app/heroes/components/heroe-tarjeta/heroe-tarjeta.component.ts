import { Component, Input, OnInit, Output } from '@angular/core';

import { iHeroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styleUrls: ['./heroe-tarjeta.component.css']
})
export class HeroeTarjetaComponent implements OnInit {
// recibo los datos del componente padre por medio del input
@Input() heroe! :iHeroes ; // la interface no puede quedar indefinida, por ende se coloca el ! para dejar los datos opcionales
  constructor() { }
  
  ngOnInit(): void {
    
  }

}
