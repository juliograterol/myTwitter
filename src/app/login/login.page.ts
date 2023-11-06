import { Component } from '@angular/core';
import FetchApi from '../services/fetchapi.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  userData = {
    email: '',
    password: '',
  };
  constructor(private apiService: FetchApi) {}

  async login() {
    // Aquí deberías agregar la lógica de inicio de sesión

    // Realiza una solicitud POST utilizando el servicio ApiService
    try {
      // Define los datos que deseas enviar en el cuerpo de la solicitud

      const response = await this.apiService.request(
        'POST',
        {
          identifier: this.userData.email,
          password: this.userData.password,
        },
        'http://localhost:3000/auth/login'
      );

      console.log('Respuesta del servidor:', response);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
    // Inicio de sesión fallido, muestra un mensaje de error
  }
}
