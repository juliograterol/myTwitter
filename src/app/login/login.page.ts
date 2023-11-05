import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  login() {
    // Aquí deberías agregar la lógica de inicio de sesión
    if (
      this.userData.email === 'usuario@example.com' &&
      this.userData.password === 'contraseña'
    ) {
      // Inicio de sesión exitoso, redirige a la página de inicio
      // Puedes utilizar el enrutador de Angular o Ionic para navegar a la página de inicio
      // Por ejemplo: this.router.navigate(['/inicio']);
    } else {
      // Inicio de sesión fallido, muestra un mensaje de error
      console.log('Inicio de sesión fallido. Verifica tus credenciales.');
    }
  }
}
