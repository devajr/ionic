import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }
  ngOnInit() {
  }
  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }
  // On Login button tap, dismiss Register modal and open login Modal
  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }
  register(form: NgForm) {

    if(form.value.c_password == "" || form.value.password == "" )
    {
      this.alertService.presentToast("Senha é campo obrigatório");
    } else if(form.value.c_password == form.value.password)
    {
      this.authService.register(form.value.name, form.value.email, form.value.password, form.value.c_password).subscribe(
        data => {
          this.authService.login(form.value.email, form.value.password).subscribe(
            data => {
            },
            error => {
              console.log(error);
            },
            () => {
              this.dismissRegister();
              this.navCtrl.navigateRoot('/dashboard');
            }
          );
          this.alertService.presentToast(data['message']);
        },
        error => {
          console.log(error);
        },
        () => {
          
        }
      );

    }else{
      this.alertService.presentToast("Senha de confirmação incorreta");
    }


  }
}