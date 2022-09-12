import { Pipe, PipeTransform } from '@angular/core';
import { IHeroes } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagenesPipe'
})
export class ImagenesPipe implements PipeTransform {
  
  transform(imagen: IHeroes): string{
      console.log(imagen)
      
      
    return './assets/heroes/'+imagen.id+'.jpg';
  }

}
