import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iAuth } from '../pages/login/interface/auth.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private _auth: iAuth | undefined;
/**
 * Devuelve una copia del objeto _auth.
 * @returns Una copia del objeto.
 */
  get auth() {
    return { ...this._auth};
  }
  /**
   * Devuelve un observable de tipo iAuth.
   * @returns El método de inicio de sesión devuelve un observable de tipo iAuth.
   */
  login() {
    return this.http
      .get<iAuth>('http://localhost:3000/usuarios/1')
      .pipe(tap((resp) => (this._auth = resp)));
  }
}
