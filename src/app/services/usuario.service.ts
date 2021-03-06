import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable , of} from 'rxjs';
import { tap, map , catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';

import { RegisterForm } from './../interfaces/register-form.interface';
import { LoginForm } from './../interfaces/login-form.interface';
import { CargarUsuario } from './../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario : Usuario;


  constructor( private http : HttpClient,
                private router : Router,
                private ngZone: NgZone ) {

                  this.googleInit();
                 }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
      return this.usuario.role;
  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers: {
        'x-token' : this.token
      }
    }
  }


  googleInit() {

    return new Promise( resolve => {
      
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '980492030051-c0rt2m9p6mrgj8jc22dtrc3ls8v3pcns.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',        
        });       
        
        resolve();
      });
                  
    })
   
  }


  guardarLocalStorage( token : string , menu : any ){

    //En el localstorage solo podemos grabar strings
    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu));

  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    // TODO: Borrar menu

    this.auth2.signOut().then(() => {

      this.ngZone.run( ()=> {
        this.router.navigateByUrl('/login');
      })      
    });
    
  }

  validarToken(): Observable<boolean>{
         
    return this.http.get(`${ base_url }/login/renew`, {
      headers: { 
        'x-token': this.token
      }
    }).pipe( 
      map( (resp:any) => {
        
        const { email, google, nombre, role, img = '' ,uid } = resp.usuario;            
        this.usuario = new Usuario( nombre , email , '' , img , google , role , uid );      

        this.guardarLocalStorage(resp.token , resp.menu);

        return true;
      }),      
      catchError( error => of(false) )
      //Devuelve un nuevo observable con el valor de false
      //Le dice que no logr?? hacer la autenticacion
    );

  }



  crearUsuario( formData: RegisterForm ){
    
    return this.http.post(`${ base_url }/usuarios`,formData )
                  .pipe(
                    tap( (resp: any)=> {

                      this.guardarLocalStorage(resp.token , resp.menu);

                    })
                  )
    
  }



  actualizarPerfil(data: { email: string, nombre: string , role: string} ){

    //Crear un objeto en donde extraigo toda la data
    data = {
      ...data,
      role: this.usuario.role
    }
   
    return this.http.put(`${ base_url }/usuarios/${ this.uid }`,data, this.headers );

  }

  login( formData : LoginForm ){

    return this.http.post(`${ base_url }/login`, formData )
                .pipe(
                  tap( (resp: any) => {

                    this.guardarLocalStorage(resp.token , resp.menu);

                  })
                )

  }

  loginGoogle( token ){

    return this.http.post(`${ base_url }/login/google`, { token } )
                .pipe(
                  tap( (resp: any) => {

                    this.guardarLocalStorage(resp.token , resp.menu);

                  })
                )

  }


  cargarUsuarios(desde : number = 0){
   
    
    const url = `${ base_url }/usuarios?desde=${ desde }`;
    
    return this.http.get<CargarUsuario>( url , this.headers )
            .pipe(
              //delay(5000),
              map( resp => {
                const usuarios = resp.usuarios.map(
                  user => new Usuario( user.nombre, user.email, '' , user.img , user.google , user.role , user.uid  )
                );
                return {

                  total: resp.total,
                  usuarios

                };
              })
            )
  }


  //Devuelve un observable
  eliminarUsuario( usuario : Usuario ){

    //  /usuarios/id
    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    return this.http.delete( url , this.headers );
  }


  //Guarda el usuario mediante una instancia del objeto
  guardarUsuario(usuario : Usuario ){
   
    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario , this.headers );
    
  }



}
