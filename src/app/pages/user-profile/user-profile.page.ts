import { Component, OnInit } from '@angular/core';
import FetchApi from 'src/app/services/fetchapi.service';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userInfo: any; // Declarar una propiedad para almacenar los datos de userInfo
  user: any;

  constructor(
    private fetchApi: FetchApi,
    private storage: Storage,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.user = params['user'];
      console.log('usuario: ', this.user); // Imprime 'user'
    });
  }

  ngOnInit() {
    this.fetchUser();
  }

  async fetchUser() {
    const token = await this.storage.get('token');
    // const userId = await this.storage.get('userId');

    const userInfo = await this.fetchApi.request(
      'GET',
      null,
      `/user/profile/${this.user}`,
      token
    );

    if (userInfo && userInfo.data) {
      this.userInfo = userInfo.data; // Asignar userInfo.data a la propiedad userInfo
    }
  }
}
