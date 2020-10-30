import { Component, OnDestroy} from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take , map , filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor() {
    
    
    

    //this.retornaObservable().pipe(
    //  retry()
    //).subscribe(
    //  valor => console.log('Subs:', valor),
    //  error => console.warn('Error:', error),
    //  () => console.info('Obs terminado')
    //);

    this.intervalSubs = this.retornaIntervalo().subscribe( (valor) => console.log(valor))

     
    

  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  

  retornaIntervalo(): Observable<number>{

    //El orden de estos operadores es importante

    return interval(100)
    .pipe(  
      //take(10),    
      map(valor => valor +1),
      filter( valor => (valor % 2 === 0 ) ? true: false),      
      );      
  }



  retornaObservable(): Observable<number>{
    let i = -1;

    //El observable no se va a disparar hasta que una persona este suscrita a el
    return new Observable<number>( observer => {
        
      

      const intervalo = setInterval( () => {
        
        i++;
        observer.next(i);

        if(i === 4){
          clearInterval( intervalo );
          observer.complete();
        }

        if(i === 2){
          
          observer.error('i llego al valor de 2');

        }

      },1000)

    });

   
  }

}
