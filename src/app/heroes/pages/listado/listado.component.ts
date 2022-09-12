import { Component, Input, OnInit, Output } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { IHeroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})

export class ListadoComponent implements OnInit {
//envio los datos al componente hijo por medio del output
  @Output() heroes:IHeroes[]= [];
  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService
      .getHeroes()
      .subscribe((resp) =>
     
        this.heroes = resp
        
      );
    
  }
}
