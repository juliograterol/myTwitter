import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storage: Storage) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const token = await this.storage.get('token'); // Obtener el token desde Ionic Storage

    if (token) {
      // El usuario tiene un token válido, permitir el acceso a la ruta
      return true;
    } else {
      // Redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}
