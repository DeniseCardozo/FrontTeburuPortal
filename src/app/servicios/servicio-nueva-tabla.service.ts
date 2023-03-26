import { Injectable } from '@angular/core';
import {Areas} from "../modelos/Areas";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Proyectos} from "../modelos/Proyectos";
import {Tablas} from "../modelos/Tablas";

@Injectable({
  providedIn: 'root'
})
export class ServicioNuevaTablaService {

  urlGeneral : string = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  getAllAreas() : Observable<Areas[]> {
    return this.http.get<Areas[]>(`${this.urlGeneral}/area`)
  }

  getAllProyectos(id_area) : Observable<Proyectos[]> {
    return this.http.get<Proyectos[]>(`${this.urlGeneral}/proyecto/area/${id_area}`)
  }

  postNewArea(area : Areas) : Observable<Areas> {
    return this.http.post<Areas>(`${this.urlGeneral}/area`, area)
  }

  postNewProyecto(proyecto : Proyectos) : Observable<Proyectos> {
    return this.http.post<Proyectos>(`${this.urlGeneral}/proyecto`, proyecto)
  }

  postNewTable(tabla: Tablas) : Observable<Tablas> {
    return this.http.post<Tablas>(`${this.urlGeneral}/tabla`, tabla)
  }
  getAreaById(id_area) : Observable<Areas> {
    return this.http.get<Areas>(`${this.urlGeneral}/area/${id_area}`)
  }
  getProyectoById(id_proyecto) : Observable<Proyectos> {
    return this.http.get<Proyectos>(`${this.urlGeneral}/proyecto/${id_proyecto}`)
  }

}
