import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LogInComponent } from './componentes/log-in/log-in.component';
import { NuevaTablaComponent } from './componentes/nueva-tabla/nueva-tabla.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { HttpClientModule } from "@angular/common/http";
import { ExplorarComponent } from './componentes/explorar/explorar.component';
import { EditarTablaComponent } from './componentes/editar-tabla/editar-tabla.component';
import { SubirArchivoComponent } from './componentes/subir-archivo/subir-archivo.component';
import { NuevoUsuarioComponent } from './componentes/nuevo-usuario/nuevo-usuario.component';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {RouterModule, Routes} from "@angular/router";
import { PrevisualizadorComponent } from './componentes/previsualizador/previsualizador.component';


const appRoutes: Routes = [
  {path: '', component: LogInComponent},
  {path:'explorar', component: ExplorarComponent},
  {path: 'nuevaTabla', component: NuevaTablaComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    NuevaTablaComponent,
    NavBarComponent,
    ExplorarComponent,
    EditarTablaComponent,
    SubirArchivoComponent,
    NuevoUsuarioComponent,
    PrevisualizadorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
