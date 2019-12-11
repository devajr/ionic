import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
import { EnvService } from './env.service';
import { AuthService } from 'src/app/services/auth.service';
import { BaseService } from './base.service';

const prefix="cliente";

@Injectable({
  providedIn: 'root'
})

export class ClienteService extends BaseService {
 
  constructor(
    private http: HttpClient,
    public storage:Storage,
    private authService: AuthService
    
  ) {
    super(prefix);
   }

  create(nome: String, cpf: String, telefone: String, endereco:String) {
    return this.http.post(`${this.actionUrl}/create` ,
      {nome: nome, telefone: telefone, cpf: cpf, endereco:endereco}, this.httpOptions
    )
  }
  listar(){
   // await this.iniciar();
   console.log(this.httpOptions)
    return  this.http.get(this.actionUrl, this.httpOptions);
  }
  async iniciar(){
  
    return this.http.get(this.actionUrl, this.httpOptions);
  }

}
