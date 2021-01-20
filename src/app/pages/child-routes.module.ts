import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimiento
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from './../guards/admin.guard';

const childRoutes: Routes = [
          {  path: '', component: DashboardComponent , data: { titulo: 'Dashboard' } },
          {  path: 'account-settings' , component : AccountSettingsComponent , data: { titulo: 'Ajustes de cuenta' } },
          {  path: 'buscar/:termino' , component: BusquedaComponent , data: { titulo : 'Busquedas' }},
          {  path: 'grafica1' , component : Graficas1Component , data: { titulo: 'Gráfica #1' } },
          {  path: 'progress' ,  component : ProgressComponent , data: { titulo: 'ProgressBar' } },
          {  path: 'promesas', component : PromesasComponent , data: { titulo: 'Promesas' }},
          {  path: 'rxjs' , component : RxjsComponent , data: { titulo: 'RxJs' }},
          {  path: 'perfil' , component : PerfilComponent , data: { titulo : 'Perfil de usuario' }},

          //Mantenimientos

          { path: 'hospitales' , component : HospitalesComponent , data: { titulo : 'Mantenimiento de hospitales' } },
          { path : 'medicos' , component : MedicosComponent , data : { titulo : 'Mantenimiento de medicos' } },
          { path : 'medico/:id' , component: MedicoComponent , data : { titulo : 'Mantenimiento de medicos' } },

          // Rutas de Admin
          { path: 'usuarios', canActivate: [AdminGuard] , component : UsuariosComponent , data: { titulo : 'Mantenimiento de usuarios' }}
]



@NgModule({    
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]  
})
export class ChildRoutesModule { }
