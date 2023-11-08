import { Component } from '@angular/core';
import FetchApi from '../services/fetchapi.service'; // Asegúrate de importar correctamente FetchApi
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  userData = {
    fullName: '',
    user: '',
    email: '',
    password: '',
    bio: '',
  };
  token: string | undefined;

  constructor(
    private apiService: FetchApi,
    private alertController: AlertController,
    private router: Router,
    private platform: Platform,
    private storage: Storage
  ) {
    this.platform.ready().then(() => {
      this.initStorage();
    });
  }

  async initStorage() {
    this.storage = await this.storage.create();
    this.token = await this.storage.get('token');
  }

  async register() {
    try {
      // Aquí debes hacer la llamada a la API para el registro del usuario.
      let userBio;
      if (!this.userData.bio) {
        userBio = '';
      } else {
        userBio = this.userData.bio;
      }
      const response = await this.apiService.request(
        'POST',
        {
          fullName: this.userData.fullName,
          username: this.userData.user,
          email: this.userData.email,
          password: this.userData.password,
          bio: userBio,
        },
        '/auth/register'
      );
      if (
        !this.userData.fullName ||
        !this.userData.email ||
        !this.userData.user ||
        !this.userData.password
      ) {
        this.presentAlert(
          'Error',
          'No se pudo registrar el usuario. Verifica tus datos e inténtalo nuevamente.',
          'OK'
        );
      }

      console.log('Respuesta del servidor:', response);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }

  async presentAlert(header: string, message: string, btnText: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [btnText],
    });

    await alert.present();
  }
}
