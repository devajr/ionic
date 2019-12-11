import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})

export class BaseService {
  protected actionUrl: string;
  public auth:any;
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    })
  };
  private env = new EnvService
  // protected storage = new Storage
  /**
   * RestService constructor
   * @param {HttpClient} _http
   * @param {string} actionUrl - URL específica. Ex.: /user, /pet
   */
   constructor(protected prefix: string) {
    console.log(sessionStorage);
    this.actionUrl = this.env.API_URL + prefix;
 
    sessionStorage.setItem("teste","123")
    console.log(sessionStorage.getItem('teste'))
    console.log(sessionStorage.getItem('auth-token'))

    if(sessionStorage.getItem('auth-token')){
      this.httpOptions.headers =  this.httpOptions.headers.set('Authorization',sessionStorage.getItem('auth-token'));
    }

  }

  
}
