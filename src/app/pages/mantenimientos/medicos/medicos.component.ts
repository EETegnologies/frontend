import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';

import { BusquedasService } from './../../../services/busquedas.service';
import { MedicoService } from './../../../services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos : Medico[] =[];
  private imgSubs: Subscription;

  constructor(private medicoService : MedicoService,
              private modalImagenService : ModalImagenService,
              private busquedasService : BusquedasService) {

    
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit() {

    this.cargarMedicos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe( delay(500) )
      .subscribe( img => this.cargarMedicos() );
  }

  cargarMedicos(){
    
    this.cargando = true;

    this.medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos;
        
      })

  }

  abrirModal( medico : Medico ){
      this.modalImagenService.abrirModal('medicos',medico._id, medico.img);
  }

  buscar( termino : string ){
    
    if( termino.length === 0 ){
      return this.cargarMedicos();
    }

    this.busquedasService.buscar('medicos',termino)
      .subscribe( resp => {
        
        this.medicos = resp;
      });

  }

  borrarMedico(medico : Medico){
    
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar al/la Doctor(a): ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then( (result) => {
      if(result.value){
        this.medicoService.borrarMedico(medico._id)
          .subscribe( resp => {

            this.cargarMedicos();
            Swal.fire(
              'Médico Borrado',
              `${ medico.nombre } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }

  

}
