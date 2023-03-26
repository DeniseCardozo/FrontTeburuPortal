import {Component, OnInit} from '@angular/core';
import {ServicioNuevaTablaService} from "../../servicios/servicio-nueva-tabla.service";
import {Areas} from "../../modelos/Areas";
import {Proyectos} from "../../modelos/Proyectos";
import {Tablas} from "../../modelos/Tablas";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {validarCaracteresEspeciales, validarEspacios, validarSeleccion} from "../../validadores/validadors";


@Component({
  selector: 'app-nueva-tabla',
  templateUrl: './nueva-tabla.component.html',
  styleUrls: ['./nueva-tabla.component.css']
})
export class NuevaTablaComponent implements OnInit{
  datosAreas : Array<Areas>=[];
  datosProyectos : Array<Proyectos>=[];
  nuevaTabla : Tablas = new Tablas();
  nuevaArea : Areas = new Areas();
  nuevoProyecto : Proyectos = new Proyectos();
  inputNuevaArea : boolean = false;
  inputNuevoProyecto : boolean = false;
  selectProyectos : boolean = true;
  formNewTablaGroup : FormGroup;

  validaciones : boolean = false;

  constructor(private datosServicio : ServicioNuevaTablaService,
              private formBuilder : FormBuilder,
              private router: Router) {
    this.formNewTablaGroup = formBuilder.group({
      areas: ["", Validators.compose([
        validarSeleccion,
      ])],
      // areaNueva: ["", Validators.compose([
      //   validarSeleccion,
      // ])],
      proyectos:  ["", Validators.compose([
        validarSeleccion,
      ])],
      // proyectoNuevo: ["", Validators.compose([
      //   validarSeleccion,
      // ])],
      tablaNueva: ["", Validators.compose([
        Validators.required,
      ])],
      esquema: ["", Validators.compose([
        Validators.required,
        validarEspacios,
        validarCaracteresEspeciales
      ])]
      // ,
      // caracteres_especiales: ["", Validators.compose([
      //   Validators.required,
      // ])]
    })
  }

  ngOnInit() : void {
    this.datosServicio.getAllAreas().subscribe(data => (this.datosAreas = data));
  };

  getProyectos() : void  {
    if (this.formNewTablaGroup.value.areas.length > 0) {
      if (this.formNewTablaGroup.value.areas == "crearNuevo"){
        this.mostrarInputsNewAreaProyecto();
      } else {
        this.inputNuevaArea = false;
        this.datosServicio.getAllProyectos(this.formNewTablaGroup.value.areas).subscribe(data => {
          this.datosProyectos = data});
      }
    }
  }

  newArea() : void {
    this.nuevaArea.nombre = this.formNewTablaGroup.value.areas;
    this.datosServicio.postNewArea(this.nuevaArea).subscribe(data => {
      // console.log(data);
       this.nuevaTabla.area = data});
  };

  newProyecto() : void {
    this.nuevoProyecto.nombre = this.formNewTablaGroup.value.proyecto;
    this.datosServicio.postNewProyecto(this.nuevoProyecto).subscribe(data => {
      // console.log(data);
       this.nuevaTabla.proyecto = data});
  }


  armarTabla() : void {
    this.validaciones = true;
    console.log(this.formNewTablaGroup.value.areas)
    console.log(this.formNewTablaGroup.value.proyectos)

    console.log(this.inputNuevaArea)
    console.log(this.inputNuevoProyecto)
    // this.newProyecto();
    // this.newArea();
    if (this.inputNuevaArea == false) {
      if (this.inputNuevoProyecto == true) {
        this.datosServicio.getAreaById(this.formNewTablaGroup.value.areas).subscribe(data => {
          // console.log(data);
          this.nuevaTabla.area = data});


        //volver a activar
        // this.newProyecto();


      } else {
        this.datosServicio.getAreaById(this.formNewTablaGroup.value.areas).subscribe(data => {
          // console.log(data);
          this.nuevaTabla.area = data});
        this.datosServicio.getProyectoById(this.formNewTablaGroup.value.proyectos).subscribe(data => {
          // console.log(data);
          this.nuevaTabla.proyecto = data});
      }
    } else {
      //volver a activar
      //
      // this.newArea();
      //   this.newProyecto();
    }

    this.nuevaTabla.nombre = this.formNewTablaGroup.value.tablaNueva;
    this.nuevaTabla.esquema = this.formNewTablaGroup.value.esquema;
    // this.nuevaTabla.caracteres_especiales = this.formNewTablaGroup.value.caracteres_especiales;
    console.log(this.nuevaTabla)
    Swal.fire({
      title: 'Estas seguro?',
      text: "Se creará una nueva tabla!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!',
      cancelButtonText: 'Cancelar'
    }).then( (result) => {
      if (result.isConfirmed) {
      this.confirmarCreacion()
      }
    })

  }

  confirmarCreacion() {
    // console.log(this.nuevaTabla.id_proyecto)
    console.log(this.nuevaTabla)
    this.datosServicio.postNewTable(this.nuevaTabla).subscribe(data => {
      console.log(data);
    Swal.fire(
      'Creada!',
      `Tabla ${data.nombre} creada exitosamente`,
      'success',
    ).then( (result) => {
      if (result.isConfirmed) {
        // this.cerrarModal();
        this.router.navigate(['/explorar'])
      }
      })})
  }

  mostrarInputsNewAreaProyecto(){
    this.inputNuevaArea = true;
    this.inputNuevoProyecto = !this.inputNuevoProyecto;
    this.selectProyectos = !this.selectProyectos;
  }

  mostrarInputNewProyecto() {
    if (this.formNewTablaGroup.value.proyectos == "crear_proyecto") {
      this.inputNuevoProyecto = !this.inputNuevoProyecto;
    }
  }

  revisarValidaciones() {
  }

}
