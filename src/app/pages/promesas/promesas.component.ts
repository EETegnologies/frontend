import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    
    this.getUsuarios().then( usuarios => { 
        console.log(usuarios);
      })

      //Aqui tengo una promesa
    //  const promesa = new Promise( ( resolve, reject ) =>{

    //    if(false){
    //      resolve('Hola Mundo');
    //   }else{
     //     reject('Algo salió mal');
    //    }
                

    //  });

      //Esto quiero ejecutar cuando la promesa se resuelve
    //  promesa.then( (mensaje) =>{
    //      console.log(mensaje);
    //  })
    //  .catch( error => console.log('Error en mi promesa', error));


    //  console.log('Fin del init');

  }

  getUsuarios(){

    return new Promise( resolve =>{
    
      fetch('https://reqres.in/api/users')
    .then( resp => resp.json())
    .then( body => resolve( body.data ));

    }); 
  }

}
