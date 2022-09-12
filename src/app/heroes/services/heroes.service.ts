import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IHeroes } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  // obtener heroes del json Server
  getHeroes(): Observable<IHeroes[]> {
    return this.http.get<IHeroes[]>('http://localhost:3000/heroes'); //<iHeroe> para validar la informacion que obtengo de la url,
    //[] para especificar que es una coleccion con varios objetos de heroes
  }
  getHeroesId(id:string):Observable<IHeroes>{
    return this.http.get<IHeroes>('http://localhost:3000/heroes/'+id);
  }

  getSugerencias(termino:string):Observable<IHeroes[]>{
    return this.http.get<IHeroes[]>('http://localhost:3000/heroes?q='+termino+'&_limit=6');
  }
}
