import { Component } from '@angular/core';
import FetchApi from '../services/fetchapi.service';
import { AlertController } from '@ionic/angular';
import { Renderer2 } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  userData = {
    identifier: '',
    password: '',
  };
  token: string | undefined; // Variable para almacenar el token

  constructor(
    private apiService: FetchApi,
    private alertController: AlertController,
    private renderer: Renderer2,
    private platform: Platform,
    private storage: Storage
  ) {
    this.platform.ready().then(() => {
      this.initStorage();
    });
  }

  async initStorage() {
    this.storage = await this.storage.create();
    // Recuperar el token si ya está almacenado
    this.token = await this.storage.get('token');
  }

  async login() {
    // Tu código para iniciar sesión

    try {
      const response = await this.apiService.request(
        'POST',
        {
          identifier: this.userData.identifier,
          password: this.userData.password,
        },
        `http://localhost:3000/auth/login`
      );

      if (response && response.data && response.data.token) {
        this.token = response.data.token;
        // Guardar el token en Ionic Storage
        await this.storage.set('token', this.token);
      } else {
        this.presentAlert(
          'Datos Erroneos',
          'El usuario/correo o la contraseña no son correctos',
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
