import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IHeroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino:string = '';
  heroes:IHeroes[]=[];
  heroeSeleccionado: IHeroes | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getSugerencias(this.termino.trim()).subscribe(data => 
      this.heroes = data);
  }

  optionSelected(event:MatAutocompleteSelectedEvent){

    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return ;
    }
    const heroe:IHeroes = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroesId(heroe.id!).subscribe(heroes => this.heroeSeleccionado = heroes);
  }
}
