import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Usuarios} from "../../modelos/Usuarios";
import {ServicioLoginService} from "../../servicios/servicio-login.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  datosUsuario: Usuarios = new Usuarios();
  usuarioLogueado: Usuarios = new Usuarios();
  session : any;

  constructor(private router: Router,
              private datosServicio: ServicioLoginService) {
  }
  logIn(formLogIn: any) {
    this.datosUsuario.email = formLogIn.form.value['email'];
    this.datosUsuario.contrasena = formLogIn.form.value['contrasena'];
    console.log(this.datosUsuario)
    this.datosServicio.postLogIn(this.datosUsuario).subscribe(
      data => {
    }, error => {
        console.log(error)
        if (error.status == 404) {
          // console.log(error.error.MensajeError)
          Swal.fire(
            'Error!',
            `${error.error.MensajeError}`,
            'error',
          )
        }
        if (error.error.email != undefined) {
          // console.log(error)
          this.router.navigate(['/explorar'])
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            customClass: {
              popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: `Bienvenido usuario ${error.error.email}`
          })
        }
        localStorage.setItem('session', JSON.stringify(error.error));

      });
    }
}
