import { Component, OnInit } from '@angular/core';
import FetchApi from 'src/app/services/fetchapi.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  userInfo: any; // Declarar una propiedad para almacenar los datos de userInfo

  constructor(
    private fetchApi: FetchApi,
    private storage: Storage,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchMyUser();
  }

  async fetchMyUser() {
    const token = await this.storage.get('token');
    const userId = await this.storage.get('userId');

    const userInfo = await this.fetchApi.request(
      'GET',
      null,
      `/user/profile/${userId}`,
      token
    );

    if (userInfo && userInfo.data) {
      this.userInfo = userInfo.data; // Asignar userInfo.data a la propiedad userInfo
    }
  }

  editProfile() {
    this.router.navigate(['edit-profile']);
  }
}
