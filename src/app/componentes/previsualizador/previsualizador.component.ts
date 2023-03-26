import {Component, Input, OnInit} from '@angular/core';
import {ServicioModalService} from "../../servicios/servicio-modal.service";
import {ServicioExplorarService} from "../../servicios/servicio-explorar.service";

@Component({
  selector: 'app-previsualizador',
  templateUrl: './previsualizador.component.html',
  styleUrls: ['./previsualizador.component.css']
})
export class PrevisualizadorComponent implements OnInit{

  @Input() id_tabla : number;
  esquemaTabla : Array<String[]>;

  constructor(private modalService : ServicioModalService,
              private datosServicio : ServicioExplorarService

              ) {  }

  ngOnInit() : void {
    this.datosServicio.getEsquemaProcesado(this.id_tabla).subscribe(data => {
        this.esquemaTabla = data;
        // console.log(this.esquemaTabla)
      }
    )
  }

  cerrarModal() {
    this.modalService.$previsualizador.emit(false);
  }

  }
