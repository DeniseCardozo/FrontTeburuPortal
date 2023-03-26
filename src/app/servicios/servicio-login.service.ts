import { Injectable } from '@angular/core';
import {Usuarios} from "../modelos/Usuarios";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServicioLoginService {

  sessionUser : Usuarios = new Usuarios();
  session : string;
  // urlGeneral : string = "http://localhost:8080/restapi-1.0-SNAPSHOT/api";
  urlGeneral : string = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  postLogIn(usuario: Usuarios) : Observable<Usuarios> {
    return this.http.post<Usuarios>(`${this.urlGeneral}/usuario/login`, usuario)
  }

  getSession() {
    this.session = localStorage.getItem('session');
    this.sessionUser = JSON.parse(this.session);
  }

  logOut() {
    localStorage.removeItem('session')
  }


}
