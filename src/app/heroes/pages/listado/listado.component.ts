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
  /* Una propiedad que se utiliza para enviar datos al componente secundario. */
  @Output() heroes:IHeroes[]= [];
 /**
  * La función constructora es un método predeterminado de la clase que se ejecuta cuando se crea una
  * instancia de la clase y garantiza la inicialización adecuada de los campos en la clase y sus
  * subclases.
  * @param {HeroesService} heroesService - HeroesService - el nombre del parámetro
  */
  constructor(private heroesService: HeroesService) {}

 /**
  * Nos suscribimos al Observable devuelto por el método heroesService.getHeroes(). Cuando los datos
  * están listos, la devolución de llamada de suscripción ejecuta la función de flecha, que establece
  * la propiedad de héroes del componente en la matriz de héroes devuelta por el servicio.
  */
  ngOnInit(): void {
    this.heroesService
      .getHeroes()
      .subscribe((resp) =>
      
        this.heroes = resp
        
      );
      
  }
  
}
