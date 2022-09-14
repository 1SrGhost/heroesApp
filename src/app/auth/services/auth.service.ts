import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iAuth } from '../pages/login/interface/auth.interface';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private _auth: iAuth | undefined;

  checkSesionAutentication(): Observable<boolean> {
    /* Comprobando si localStorage tiene una identificación. Si no es así, devuelve falso. Si lo hace,
    devuelve verdadero. */
    if (!localStorage.getItem('id')) {
      return of(false);
    }
    return this.http.get<iAuth>('http://localhost:3000/usuarios/1').pipe(
      
      map((auth) => {
        console.log('map', auth);
        this._auth = auth;
        return true;
      })
    );
  }
  /**
   * Devuelve una copia del objeto _auth.
   * @returns Una copia del objeto.
   */
  get auth() {
    return { ...this._auth };
  }
  /**
   * Devuelve un observable de tipo iAuth.
   * @returns El método de inicio de sesión devuelve un observable de tipo iAuth.
   */
  login() {
    return this.http.get<iAuth>('http://localhost:3000/usuarios/1').pipe(
      tap((resp) => (this._auth = resp)),
      tap((resp) => localStorage.setItem('id', resp.id)),
      tap((resp) => localStorage.setItem('email', resp.email)),
      tap((resp) => localStorage.setItem('Usuario', resp.usuario))
    );
  }
}
