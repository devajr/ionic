import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, ignoreElements } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { BaseService } from './base.service';

const prefix="";
const token_key = "auth-token";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{
  isLoggedIn = false;
  token:any;
  constructor(
    private http: HttpClient,
    public storage: Storage,
  //  private env: EnvService,
  ) {
    super(prefix);
   }

  login(email: String, password: String) {
    return this.http.post(this.actionUrl + 'login', {email: email, password: password}).pipe(
      tap(async (token : any)  => {
        console.log(token)
         sessionStorage.setItem(token_key, token.token_type + " " + token.access_token);
         this.httpOptions.headers =  this.httpOptions.headers.set('Authorization',token.token_type + " " + token.access_token);
        
        // console.log(teste.token_type)
        // console.log(sessionStorage)
       
        this.token = token;
        console.log("tokeeeeee")
        console.log(token.token_type)
        this.isLoggedIn = true;
        return token;
      }),
      catchError( err => {
        console.log('DEU ERRO');
        console.log(err);
        return err;
      }) 
    );
  }

  register(name: String, email: String, password: String, c_password:String) {
    return this.http.post(this.actionUrl + 'register',
      {name: name, email: email, password: password, c_password:c_password}
    )
  }


  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(this.actionUrl + 'logout', { headers: headers })
    .pipe(
      tap(data => {
        console.log(this.storage.get('token_type'))
        if(this.storage.get('token_type') != undefined && this.storage.get('token_type') != null){
          this.storage.remove("token_type");
          this.isLoggedIn = false;
          delete this.token;
          return data;
        }
        
      })
    )
  }
  user() {
    console.log(this.token);
  
    return this.http.get<User>(this.actionUrl + 'getUser', this.httpOptions)
    .pipe(
      tap(user => {
        return user;
      })
    )
  }
  // isLogado() {
  //     return this.storage.get('token').then(
  //       data => {
  //         this.token = data;
  //         if(this.token != null) {
  //           this.isLoggedIn=true;
  //         } else {
  //           this.isLoggedIn=false;
  //         }
  //       },
  //       error => {
  //         this.token = null;
  //         this.isLoggedIn=false;
  //       }
  //     );
  //   }
  // getToken() {
  //   return this.storage.get('token').then(
  //     data => {
  //       this.token = data;
  //       if(this.token != null) {
  //         this.isLoggedIn=true;
  //       } else {
  //         this.isLoggedIn=false;
  //       }
  //     },
  //     error => {
  //       this.token = null;
  //       this.isLoggedIn=false;
  //     }
  //   );
  // }
 
}