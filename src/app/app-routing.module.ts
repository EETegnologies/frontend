import { AuthRoutingModule } from './auth/auth.routing';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Modulos
import { PagesRoutingModule } from './pages/pages.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';



const routes: Routes = [

  // path : '/dashboard Pagesrouting'
  // path: '/auth AuthRouting
    
  {path: '' , redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**' , component: NopagefoundComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
