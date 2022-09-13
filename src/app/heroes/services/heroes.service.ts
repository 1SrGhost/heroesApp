import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { iHeroes } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
/**
 * La función constructora es una función especial que se llama cuando se crea una nueva instancia de
 * la clase.
 * @param {HttpClient} http - HttpClient: este es el HttpClient que importamos de @angular/common/http.
 */
  constructor(private http: HttpClient) {}

  // obtener heroes del json Server
/**
 * Devuelve un Observable de tipo Hero[] (una matriz de objetos Hero)
 * @returns Un Observable de tipo iHeroes array
 */
  getHeroes(): Observable<iHeroes[]> {
    return this.http.get<iHeroes[]>('http://localhost:3000/heroes'); //<iHeroe> para validar la informacion que obtengo de la url,
    //[] para especificar que es una coleccion con varios objetos de heroes
  }
/**
 * La función toma una identificación como parámetro y devuelve un Observable de tipo iHeroes
 * @param {string} id - La identificación del héroe a recuperar.
 * @returns Un observable de tipo iHeroes
 */
  getHeroesId(id:string):Observable<iHeroes>{
    return this.http.get<iHeroes>('http://localhost:3000/heroes/'+id);
  }

/**
 * Usamos el método http.get() para obtener los datos del servidor y usamos la clase Observable para
 * devolver los datos.
 * @param {string} termino - El término de búsqueda.
 * @returns Un Observable de tipo iHeroes[]
 */
  getSugerencias(termino:string):Observable<iHeroes[]>{
    return this.http.get<iHeroes[]>('http://localhost:3000/heroes?q='+termino+'&_limit=6');
  }

/**
 * La función toma un objeto heroe como parámetro y devuelve un observable de tipo iHeroes
 * @param {iHeroes} heroe - iHeroes: este es el objeto heroe que estamos pasando a la API.
 * @returns Un observable de tipo iHeroes
 */
  addHeroe(heroe:iHeroes):Observable<iHeroes>{

    return this.http.post<iHeroes>('http://localhost:3000/heroes',heroe)

  }

  /**
   * Estamos usando el método http.put() para enviar una solicitud PUT al servidor y estamos pasando el
   * objeto héroe como segundo argumento.
   * @param {iHeroes} heroe - iHeroes: el objeto héroe que queremos actualizar.
   * @returns Un observable de tipo iHeroes
   */
  updateHeroe(heroe:iHeroes):Observable<iHeroes>{

    return this.http.put<iHeroes>('http://localhost:3000/heroes/'+heroe.id,heroe)

  }

/**
 * Toma un id como parámetro, y luego devuelve un observable de tipo any
 * @param {string} id - La identificación del héroe a eliminar.
 * @returns El observable del heroe eliminado
 */
  deleteHeroe(id:string):Observable<any>{

    return this.http.delete<any>('http://localhost:3000/heroes/'+id)

  }
}
