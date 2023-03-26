import {Component, Input, OnInit} from '@angular/core';
import {ServicioModalService} from "../../servicios/servicio-modal.service";
import {ServicioExplorarService} from "../../servicios/servicio-explorar.service";
import Swal from "sweetalert2";
import {ServicioLoginService} from "../../servicios/servicio-login.service";

@Component({
  selector: 'app-subir-archivo',
  templateUrl: './subir-archivo.component.html',
  styleUrls: ['./subir-archivo.component.css']
})
export class SubirArchivoComponent implements OnInit{
  @Input() id_tabla : number;
  archivoSeleccionado : File;
  id_usuario : number;


  constructor(private modalService : ServicioModalService,
              private datosServicio : ServicioExplorarService,
              private logInServicio : ServicioLoginService) {
  }

  ngOnInit() : void {
    this.logInServicio.getSession()
    this.id_usuario = this.logInServicio.sessionUser.id_usuario
  }

  cerrarModal() {
    this.modalService.$inputFile.emit(false);
  }

  seleccionarFile(event): void {
    if (event.target.files.length == 1) {
      console.log(event.target.files[0])
      // this.formData.append('file',event.target.files[0], event.target.files[0].name);
      // console.log(this.formData)

      this.archivoSeleccionado = event.target.files[0];
      console.log(this.archivoSeleccionado)
    }
  }

  subirFile(id_tabla) {
    Swal.fire({
      title: '¿Desea subir el archivo?',
      text: "A continuación se analizará si cumple con los criterios establecidos",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then( (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('files', this.archivoSeleccionado, this.archivoSeleccionado.name)
        this.datosServicio.upload(formData, id_tabla, this.id_usuario).subscribe(
          event => { },
            err => {
            // console.log("este es el error")
            // console.log(err.error)
            if (err.error.text != "Pasó todos los controles de estructura y calidad"){
              Swal.fire(
                'Resultado del Analisis',
                `${err.error.text}`,
                'error',
              ).then( () => {
                if (result.isConfirmed) {
                  this.cerrarModal();
                  // window.location.reload()

                }})
            } else {
              Swal.fire(
                'Archivo subido exitosamente',
                `${err.error.text}`,
                'success',
              ).then( () => {
                if (result.isConfirmed) {
                  this.cerrarModal();
                  window.location.reload()

                }})
            }


          }

          )
      }
    })


  }




}

