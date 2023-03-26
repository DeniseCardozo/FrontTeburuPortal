import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable, pipe, Subject, tap} from "rxjs";
import {Areas} from "../modelos/Areas";
import {Proyectos} from "../modelos/Proyectos";
import {Tablas} from "../modelos/Tablas";

@Injectable({
  providedIn: 'root'
})
export class ServicioExplorarService {

  // private _refresh$ = new Subject<void>()
  // urlGeneral : string = "http://localhost:8080/restapi-1.0-SNAPSHOT/api";
  urlGeneral : string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  // get refresh$() {
  //   return this._refresh$;
  // }

  showAllAreas() : Observable<Areas[]> {
    return this.http.get<Areas[]>(`${this.urlGeneral}/area`)
  }

  showAllProyectos(id_area) : Observable<Proyectos[]> {
    return this.http.get<Proyectos[]>(`${this.urlGeneral}/proyecto/area/${id_area}`)
  }

  showAllTablas(id_proyecto) : Observable<Tablas[]> {
    return this.http.get<Tablas[]>(`${this.urlGeneral}/tabla/proyecto/${id_proyecto}`)
  }

  getAreaById(id_area) : Observable<Areas> {
    return this.http.get<Areas>(`${this.urlGeneral}/area/${id_area}`)
  }

  getProyectoById(id_proyecto) : Observable<Proyectos> {
    return this.http.get<Proyectos>(`${this.urlGeneral}/proyecto/${id_proyecto}`)
  }

  getTablaDetalle(id_tabla) : Observable<Tablas> {
    return this.http.get<Tablas>(`${this.urlGeneral}/tabla/${id_tabla}`)
  }

  putTabla(tabla : Tablas, id_tabla) : Observable<Tablas> {
    return this.http.put<Tablas>(`${this.urlGeneral}/tabla/${id_tabla}`, tabla)
    // .pipe(
    //   tap(() => {
    //     this._refresh$.next();
    //   })
    // )
  }

  deleteTabla(id_tabla) : Observable<Tablas> {
    return this.http.delete<Tablas>(`${this.urlGeneral}/tabla/${id_tabla}`)
  }


  upload(formData: FormData, id_tabla, id_usuario): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.urlGeneral}/file/upload/${id_tabla}/${id_usuario}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getEsquemaProcesado(id_tabla) : Observable<Array<String[]>> {
    return this.http.get<Array<String[]>>(`${this.urlGeneral}/tabla/esquemaProcesado/${id_tabla}`)
  }


}


