import { Component, OnInit } from '@angular/core';
import FetchApi from '../services/fetchapi.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  tweets: any[] = []; // Asume que el tipo de tweets es 'any' por ahora

  constructor(private fetchApi: FetchApi, private storage: Storage) {}

  ngOnInit() {
    this.fetchTweets();
  }

  async fetchTweets() {
    try {
      const token = await this.storage.get('token'); // Obtener el token desde Ionic Storage
      const userId = await this.storage.get('userId');

      if (token) {
        // El usuario tiene un token válido, permitir el acceso a la ruta
        const response = await this.fetchApi.request(
          'GET',
          null,
          `/tweet/feed/${userId}`,
          token
        );
        console.log(response);
        if (response && response.data && Array.isArray(response.data)) {
          this.tweets = response.data; // Asignar la respuesta a la propiedad 'tweets'
        }
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }
}
