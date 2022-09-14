import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  
} from '@angular/router';

import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    return this.authService.checkSesionAutentication().pipe(
      tap(isCheck=>{
        if(!isCheck){
          this.router.navigate(['/login']);
        }
      })
    )
    ;
    /*       if(this.authService.auth.id){
        return true
      }
      alert("No se a autenticado, Ingrese a login primero -- CanActivate");
    return false; */
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.authService.checkSesionAutentication();

    /* if(this.authService.auth.id){
        return true
      }
      alert("No se a autenticado, Ingrese a login primero")
    return false; */
  }
}
