import {Component, Input, OnInit} from '@angular/core';
import {ServicioModalService} from "../../servicios/servicio-modal.service";
import {Tablas} from "../../modelos/Tablas";
import {ServicioExplorarService} from "../../servicios/servicio-explorar.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-editar-tabla',
  templateUrl: './editar-tabla.component.html',
  styleUrls: ['./editar-tabla.component.css']
})
export class EditarTablaComponent implements OnInit{

  @Input() id_tabla : number;
  tablaActualizada: Tablas = new Tablas();
  formEditarTablaGroup: FormGroup;

  constructor(private modalService : ServicioModalService,
              private datosServicio : ServicioExplorarService,
              private formBuilder : FormBuilder,
              private router: Router) {
    this.formEditarTablaGroup = formBuilder.group({
      nombre: "",
      esquema: ""
      // ,
      // caracteres_especiales: ""
    })
  }

  ngOnInit() : void {
    this.datosServicio.getTablaDetalle(this.id_tabla).subscribe(data => {
      this.formEditarTablaGroup.setValue({
        nombre : data.nombre,
        esquema: data.esquema
        // ,
        // caracteres_especiales: data.caracteres_especiales
      })
    })

  }

  cerrarModal() {
    this.modalService.$modalSwitch.emit(false);
  }

   actualizarDatosTabla() {
     Swal.fire({
       title: 'Estas seguro?',
       text: "Se modificarán los datos de esta tabla!",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si, modificar tabla!',
       cancelButtonText: 'Cancelar'
     }).then( (result) => {
       if (result.isConfirmed) {
         this.datosServicio.getTablaDetalle(this.id_tabla).subscribe(data => {
           // this.tablaActualizada.id_area = data.id_area;
           // this.tablaActualizada.id_proyecto  = data.id_proyecto;
         });
         this.tablaActualizada.nombre = this.formEditarTablaGroup.value.nombre;
         this.tablaActualizada.esquema = this.formEditarTablaGroup.value.esquema;
         // this.tablaActualizada.caracteres_especiales = this.formEditarTablaGroup.value.caracteres_especiales;
         this.datosServicio.putTabla(this.tablaActualizada, this.id_tabla).subscribe(data => {
         }, error => {
           Swal.fire(
             'Modificada!',
             `Los datos de la tabla ${error.error.nombre} han sido modificados correctamente.`,
             'success',
           ).then( () => {
             if (result.isConfirmed) {
               this.cerrarModal();
               window.location.reload()

             }})
         });
       }
     })


  }




}
