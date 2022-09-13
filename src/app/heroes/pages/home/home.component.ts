import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { iAuth } from '../../../auth/pages/login/interface/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 /**
  * La propiedad auth es un captador que devuelve la propiedad authService.auth
  * @returns La propiedad auth del authService.
  */
  get auth() {
    return this.authService.auth;
  }
  constructor(private router: Router,
      private authService: AuthService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.router.navigate(['./auth']);
  }

}
