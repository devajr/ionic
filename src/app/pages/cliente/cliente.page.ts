import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  clientes:any;
  
  constructor(private modalController: ModalController,
    private clienteService: ClienteService,
    private navCtrl: NavController,
    private alertService: AlertService
    ) {  
     this.clienteService.listar().subscribe(res => {
        this.clientes = res;
      });
    }

  ngOnInit() {
  }
  addCliente(){
    this.navCtrl.navigateRoot('form-cliente');
  }
  goBack(){
    this.navCtrl.navigateRoot('dashboard');
  }
  
}
