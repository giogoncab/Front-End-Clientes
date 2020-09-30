import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = 'App Angular - Spring';

  constructor(public authService: AuthService, public router: Router) { }

  logout(): void{
    swal.fire('Logout', `Hola ${this.authService.usuario.username}, has cerrado sesion con exito!`, 'success')
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
