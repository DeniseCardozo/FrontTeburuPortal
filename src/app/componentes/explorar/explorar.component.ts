import {Component, OnInit} from '@angular/core';
import {Areas} from "../../modelos/Areas";
import {ServicioExplorarService} from "../../servicios/servicio-explorar.service";
import {Proyectos} from "../../modelos/Proyectos";
import {Tablas} from "../../modelos/Tablas";
import {ServicioModalService} from "../../servicios/servicio-modal.service";
import {ServicioLoginService} from "../../servicios/servicio-login.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {
  mostrarAreas : Array<Areas>=[];
  mostrarProyectos : Array<Proyectos>=[];
  mostrarTablas : Array<Tablas>=[];
  contenedorProyectos : boolean = false;
  contenedorTablas : boolean = false;
  datosArea : Areas = new Areas();
  datosProyecto : Proyectos = new Proyectos();
  modalSwitch : boolean;
  id_tabla : number;
  showBotones : boolean;
  archivoSeleccionado : File;
  inputFile : boolean;
  esquemaTabla : Array<String[]>;
  nombresColumnas : String[];
  str : String;
  previsualizador : boolean;



  constructor(private datosServicio:ServicioExplorarService,
              private modalService : ServicioModalService,
              private logInServicio : ServicioLoginService) {  }

  ngOnInit() : void {
    this.datosServicio.showAllAreas().subscribe(data => (this.mostrarAreas = data));
    this.modalService.$modalSwitch.subscribe(valor => (this.modalSwitch = valor));
    this.modalService.$inputFile.subscribe(valor => (this.inputFile = valor) );
    this.modalService.$previsualizador.subscribe(valor => (this.previsualizador = valor))
    this.logInServicio.getSession()
    if (this.logInServicio.sessionUser.rol == 0) {
      this.showBotones = true;
    } else {
      this.showBotones = false;
    }

    // this.suscription = this.datosServicio.refresh$.subscribe(() => {
    //   this.datosServicio.showAllAreas().subscribe(data => (this.mostrarAreas = data));
    // })
  };

  mostrarAllProyectos(id_area) : void {
    this.datosServicio.showAllProyectos(id_area).subscribe(data => (this.mostrarProyectos = data));
    this.datosServicio.getAreaById(id_area).subscribe(data => (this.datosArea = data));
    this.contenedorProyectos = true;
    this.contenedorTablas = false;
  }

  mostarAllTablas(id_proyecto): void {
    this.datosServicio.showAllTablas(id_proyecto).subscribe(data => (this.mostrarTablas = data));
    this.datosServicio.getProyectoById(id_proyecto).subscribe(data => (this.datosProyecto = data));
    this.contenedorTablas = true;
  }

  showModal(id_tabla) : void {
    this.modalSwitch = true;
    this.id_tabla = id_tabla;
  }

  eliminarTabla(id_tabla) : void {
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar tabla!',
      cancelButtonText: 'Cancelar'
    }).then( async (result) => {
      if (result.isConfirmed) {
        this.datosServicio.deleteTabla(id_tabla).subscribe(() =>{
          Swal.fire(
            'Eliminada!',
            'La tabla ha sido eliminada correctamente.',
            'success'
          ).then( () => {
            if (result.isConfirmed) {
              window.location.reload()
            }})}
        )
      }
    })
  }

  showInputFile(id_tabla) {
    this.inputFile = true;
    this.id_tabla = id_tabla;
  }



  showPrevisualizador(id_tabla) {
    this.previsualizador = true;
    this.id_tabla = id_tabla;

    // this.armarprevisualizador(id_tabla);
  }

  // armarprevisualizador(id_tabla) : void {
  //   this.datosServicio.getEsquemaProcesado(id_tabla).subscribe(data => {
  //     console.log(data);
  //     // data.map(elem => {
  //     //   this.str = elem[0]
  //     //   console.log(elem)
  //     //   console.log(elem[0])
  //     //   this.nombresColumnas.concat(this.str)
  //     // })
  //       this.esquemaTabla = data;
  //       console.log(this.esquemaTabla)
  //   }
  //     )
  //
  // }



}
