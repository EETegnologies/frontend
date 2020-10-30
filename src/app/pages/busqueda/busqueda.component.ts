import { BusquedasService } from './../../services/busquedas.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Hospital } from './../../models/hospital.model';
import { Medico } from './../../models/medico.model';
import { Usuario } from './../../models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService ) { }

  ngOnInit() {

    //Debo desestructurar de ese modo
    this.activatedRoute.params
      .subscribe( ({ termino }) => this.busquedaGlobal( termino ));
   
  }

  busquedaGlobal(termino : string){

    this.busquedasService.busquedaGlobal( termino )
        .subscribe( (resp : any) => {

          console.log( resp );
          this.usuarios   = resp.usuarios;
          this.medicos    = resp.medicos;
          this.hospitales = resp.hospitales;

        } )
  }

  abrirMedico( medico : Medico ){

    

  }

}
