import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuarios} from "../modelos/Usuarios";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServicioSignupService {

  urlGeneral : string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  postSignUp(usuario: Usuarios) : Observable<Usuarios>{
    return this.http.post<Usuarios>(`${this.urlGeneral}/usuario/signUp`, usuario)
}



}
