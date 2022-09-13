import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iHeroes, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  /* Una matriz de objetos que se utiliza para completar el menú desplegable en el formulario. */
  creadores = [
    {
      id: 'DC Comics',
      desc: 'Dc - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  /* Creando un nuevo objeto de tipo iHeroes y asignándolo a la variable heroe. */
  heroe: iHeroes = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: 'no-image.png',
  };
  proceso = 'Agregar';

  /**
   * La función constructora es una función predeterminada que se ejecuta cuando se carga el componente.
   * @param {HeroesService} heroesService - Este es el servicio que creamos en el paso anterior.
   * @param {ActivatedRoute} activatedRoute - ActivatedRoute es específico para cada componente enrutado
   * cargado por Angular Router. Contiene información sobre la ruta, sus parámetros y datos adicionales
   * asociados a la ruta.
   * @param {Router} router - Enrutador: el enrutador es un servicio para navegar entre rutas.
   * @param {MatSnackBar} _snackBar - Este es un servicio que nos permite mostrar un mensaje al usuario.
   */
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  /**
   * Usamos el servicio ActivatedRoute para obtener la identificación del héroe que queremos editar,
   * luego usamos HeroesService para obtener el héroe con esa identificación y, finalmente, nos
   * suscribimos al observable que devuelve la función getHeroesId() y asignando el héroe a la
   * propiedad heroe
   */
  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.proceso = 'Editar';

      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroesId(id)))
        .subscribe((heroe) => (this.heroe = heroe));
    }
  }

  /**
   * Si el nombre del héroe está en blanco, no hagas nada; de lo contrario, si el héroe tiene una
   * identificación, llamar a actualizar; de lo contrario, llame a agregar
   * @returns El observable está siendo devuelto.
   */
  guardar() {
    /* Comprobando si el héroe tiene nombre, si no tiene nombre, no hará nada. */
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    /* Esto es verificar si el héroe tiene una identificación, si la tiene, actualizará el héroe. */
    if (this.heroe.id) {
      console.log('se quiere actualizar un heroe');
      this.heroesService
        .updateHeroe(this.heroe)
        .subscribe((heroe) => this.openSnackBar('Registro Actualizado'));
      /* si no la tiene creara el heroe */
    } else {
      console.log('se quiere agregar un heroe');
      /* Suscribirse al observable devuelto por el método addHeroe(). */
      this.heroesService.addHeroe(this.heroe).subscribe((resp) => {
        this.router.navigate(['/heroes/editar', resp.id]);
        this.openSnackBar('Heroe Creado');
      });
    }
  }
  /**
   * Estamos llamando al método deleteHeroe() de HeroesService, pasando la identificación del héroe que
   * queremos eliminar.
   *
   * Si la eliminación es exitosa, estamos redirigiendo al usuario a la página del listado.
   */
  deleteHeroe() {
    /* Apertura de un cuadro de diálogo. */
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe,
    });

    /* Esta es una función que se llama cuando el usuario hace clic en el botón Guardar. */
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.heroesService.deleteHeroe(this.heroe.id!).subscribe((resp) => {
          this.router.navigate(['/heroes/listado']);
        });
      }
    });
  }
  /* Una función que se llama cuando el usuario hace clic en el botón Guardar. */
  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'ok!!', { duration: 2500 });
  }
}
