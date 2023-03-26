import {Component, OnInit} from '@angular/core';
import {Usuarios} from "../../modelos/Usuarios";
import {ServicioLoginService} from "../../servicios/servicio-login.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  showBotones : boolean;
  constructor(private logInServicio : ServicioLoginService) {  }

  ngOnInit() {
    this.logInServicio.getSession()
    if (this.logInServicio.sessionUser.rol == 0) {
      this.showBotones = true;
    } else {
      this.showBotones = false;
    }
  }

  cerrarSesion() {
    this.logInServicio.logOut();
  }

}
