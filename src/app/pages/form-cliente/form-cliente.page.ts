import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.page.html',
  styleUrls: ['./form-cliente.page.scss'],
})
export class FormClientePage implements OnInit {

  constructor(private modalController: ModalController,
    private clienteService: ClienteService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }
  create(form: NgForm){
    console.log("entreii")
    this.clienteService.create(form.value.nome, form.value.cpf, form.value.telefone, form.value.endereco).subscribe(
      data => {
        this.navCtrl.navigateRoot('/cliente');
       
        this.alertService.presentToast(data['message']);
      },
      error => {
        console.log(error);
      },
      () => {
        
      }
    );

  }
  goBack(){
    this.navCtrl.navigateRoot('cliente');
  }
}
