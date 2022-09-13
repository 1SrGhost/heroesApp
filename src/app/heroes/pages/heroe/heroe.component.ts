import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { IHeroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  // importo el activate router para poder trabajar los datos
/**
 * Usamos el servicio ActivatedRoute para obtener la identificación del héroe que queremos mostrar,
 * luego usamos HeroesService para obtener el héroe con esa identificación y luego usamos el servicio
 * de enrutador para volver a la página anterior.
 * @param {ActivatedRoute} activatedRoute - ActivatedRoute contiene información sobre la ruta a esta
 * instancia de HeroDetailComponent. Este componente está interesado en la bolsa de parámetros de la
 * ruta extraídos de la URL. El parámetro "id" es el id del héroe a mostrar.
 * @param {HeroesService} heroesService - Este es el servicio que creamos en el paso anterior.
 * @param {Router} router - enrutador
 */
  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) {}
 /* Una característica de TypeScript llamada Operador de aserción no nulo. */
 /* El código anterior usa el operador switchMap para obtener la identificación de la ruta activada y
 luego usa esa identificación para obtener el héroe de heroesService. */
  heroe!: IHeroes;
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroesId(id)))
      .subscribe((resp) => (this.heroe = resp));
  }

  /**
   * La función usa el enrutador para navegar de regreso a la lista de héroes
   */
  regresar() {
    this.router.navigate(['heroes/listado']);
  }
}
