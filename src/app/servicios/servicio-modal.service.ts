import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioModalService {

  constructor() { }

  $modalSwitch = new EventEmitter<any>();
  $inputFile = new EventEmitter<any>();
  $previsualizador = new EventEmitter<any>();
}
