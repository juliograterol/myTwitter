import { Component } from '@angular/core';
import FetchApi from '../services/fetchapi.service';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

interface DecodedToken {
  id: string;
  // Otras propiedades del token si las hay
}

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
        `/auth/login`
      );

      if (response && response.data && response.data.token) {
        this.token = response.data.token;
        // Guardar el token en Ionic Storage
        if (this.token !== undefined) {
          await this.storage.set('token', this.token);
          const decodedToken: DecodedToken = jwt_decode.jwtDecode(this.token);
          const userId = decodedToken.id; // Accede a la propiedad userId
          // Guardar el userId en Ionic Storage
          console.log(userId);
          await this.storage.set('userId', userId);
        }

        this.router.navigateByUrl('tabs');
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
