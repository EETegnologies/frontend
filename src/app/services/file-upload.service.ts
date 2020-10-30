import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File ,
    tipo : 'usuarios'|'medicos'|'hospitales',
    id: string
  ) {
    
    try {

      const url = `${ base_url }/upload/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch( url , {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if(data){
        return data.nombreArchivo;
      }else{
        console.log(data.msg);
        return false;
      }     

      //console.log(data);
      

    } catch( error ) {
      return false;
      console.log(error);
    }


  }


}
