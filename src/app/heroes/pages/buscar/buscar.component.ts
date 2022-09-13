/* Importación de los módulos necesarios para el componente. */
import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IHeroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit {
  /* Declarar las variables que se utilizarán en el componente. */
  termino: string = '';
  heroes: IHeroes[] = [];
  heroeSeleccionado: IHeroes | undefined;

  /**
   * La función constructora es un método predeterminado de la clase que se ejecuta cuando se crea una
   * instancia de la clase y garantiza la inicialización adecuada de los campos en la clase y sus
   * subclases.
   * @param {HeroesService} heroesService - HeroesServicio
   */
  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  /**
   * La función se suscribe al observable devuelto por el método getSugerencias() del servicio. Cuando
   * el observable emite un valor, la función de devolución de llamada establece la propiedad de héroes
   * del componente en el valor emitido
   */
  buscando() {
    this.heroesService
      .getSugerencias(this.termino.trim())
      .subscribe((data) => (this.heroes = data));
  }

  /**
   * Cuando el usuario selecciona una opción de la lista de autocompletar, verificamos si la opción
   * tiene un valor. Si no es así, configuramos el héroe seleccionado como indefinido y regresamos. Si
   * es así, establecemos el héroe seleccionado en el valor de la opción, establecemos el término de
   * búsqueda en el nombre del héroe y luego llamamos a la función getHeroesId() para obtener los
   * detalles del héroe.
   * @param {MatAutocompleteSelectedEvent} event - MatAutocompletarSelectedEvent
   * @returns El heroeSeleccionado está siendo devuelto.
   */
  optionSelected(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }
    const heroe: IHeroes = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService
      .getHeroesId(heroe.id!)
      .subscribe((heroes) => (this.heroeSeleccionado = heroes));
  }
}
