import { Component, Renderer2 } from '@angular/core';
import FetchApi from '../services/fetchapi.service';
import { AlertController } from '@ionic/angular';

// import { Router } from '@angular/router';

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
  constructor(
    private apiService: FetchApi,
    private alertController: AlertController,
    private renderer: Renderer2
  ) {}

  async login() {
    // Aquí deberías agregar la lógica de inicio de sesión

    // Realiza una solicitud POST utilizando el servicio ApiService
    try {
      // Define los datos que deseas enviar en el cuerpo de la solicitud

      if (!this.userData.identifier || !this.userData.password) {
        this.presentAlert(
          'Datos Incompeltos',
          'Para iniciar sesión debe llenar todo los datos',
          'OK'
        );
        return;
      }

      const response = await this.apiService.request(
        'POST',
        {
          identifier: this.userData.identifier,
          password: this.userData.password,
        },
        `http://localhost:3000/auth/login`
      );

      if (!response) {
        this.presentAlert(
          'Datos Erroneos',
          'El usuario/correo, o la contraseña no son correctos',
          'OK'
        );
      }

      console.log('Respuesta del servidor:', response);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
    // Inicio de sesión fallido, muestra un mensaje de error
  }
  async presentAlert(header: string, message: string, btnText: string) {
    const alert = await this.alertController.create({
      header: header,
      // subHeader: 'Important message',
      message: message,
      buttons: [btnText],
    });

    await alert.present();
  }
}
