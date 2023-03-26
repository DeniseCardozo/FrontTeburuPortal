import { Component } from '@angular/core';
import {Usuarios} from "../../modelos/Usuarios";
import {ServicioSignupService} from "../../servicios/servicio-signup.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent {
  datosUsuario: Usuarios = new Usuarios();
  nuevoUsuario: Usuarios = new Usuarios();
  subject: string = "Tu cuenta de Teburu Portal está lista";
  body: string;

  constructor(private servicioSignupService: ServicioSignupService) { }

  signUp(formSignup : any) {
    this.datosUsuario.email = formSignup.form.value['email'];
    this.servicioSignupService.postSignUp(this.datosUsuario).subscribe(
      data => {
        console.log(data);
        this.nuevoUsuario = data;
        this.body = `Bienvenido Teburu Portal! %0A %0A - Debes utilizar tu email brindado por tu empresa %0A - Tu contraseña es ${data.contrasena}. %0A %0A Puedes ingresar a la app desde este link: http://localhost:4200/ %0A %0A Gracias por usar Teburu Portal!`;
        Swal.fire(
          'Usuario creado exitosamente',
          `<a id="sendMail" href="mailto:${data.email}?subject=${this.subject}&body=${this.body}">¿Enviar datos a email ${data.email}?</a>`,
          'success',
        ).then( (result) => {
          if (result.isConfirmed) {
            formSignup.reset();
        }})
          }, error => {
        if (error.status == 302) {
          Swal.fire(
            'Error!',
            `${error.error.Mensaje}`,
            'error',
          )
        }
      }
    )
  }




}
