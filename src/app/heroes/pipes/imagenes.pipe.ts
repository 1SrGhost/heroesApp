import { Pipe, PipeTransform } from '@angular/core';
import { IHeroes } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagenesPipe',
  pure: false, // si se deja en false, actualiza con cualquiera cambio en la interface
})
/* La clase ImagenesPipe implementa el método transform() de la interfaz PipeTransform que acepta un
valor de entrada y una matriz opcional de parámetros y devuelve el valor transformado */
export class ImagenesPipe implements PipeTransform {
  /* Un método que forma parte de la interfaz PipeTransform. Es un método que se llama cuando se
  utiliza la tubería. */
  transform(imagen: IHeroes): string {
    /* Si la identificación de la imagen no está definida, devuelva no-image.png */
    if (!imagen.id) {
      return './assets/no-image.png';
    } /* Comprobando si la imagen es no-image.png y si lo es, devuelve la imagen no-image.png. */ else if (
      imagen.alt_img == 'no-image.png'
    ) {
      return './assets/no-image.png';
    } else if (imagen.alt_img) {
    /* Comprobando si la imagen es no-image.png y si lo es, devuelve la imagen no-image.png. */
      return imagen.alt_img;
    } /* Devolviendo la imagen del héroe. */ else {
      return './assets/heroes/' + imagen.id + '.jpg';
    }
  }
}
