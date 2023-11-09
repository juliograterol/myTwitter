import { Component, OnInit } from '@angular/core';
import FetchApi from 'src/app/services/fetchapi.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  userList: any[] = [];
  searchText: string = ''; // Declara searchText como propiedad

  constructor(private fetchApi: FetchApi, private storage: Storage) {}

  ngOnInit() {
    this.fetchUsers();
  }

  async onSearchChange(event: any) {
    this.searchText = event;
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const userId = await this.storage.get('userId');
      let endpoint = `/user/data/allUsers/${userId}`;
      if (this.searchText !== '') {
        endpoint = `/user/search/${userId}/${this.searchText}`;
      } else {
        endpoint = `/user/data/allUsers/${userId}`;
      }
      const token = await this.storage.get('token');
      // Realiza la solicitud con el token y obtén la lista de usuarios
      const response = await this.fetchApi.request(
        'GET',
        null,
        endpoint,
        token
      );

      if (response && response.data && Array.isArray(response.data)) {
        this.userList = response.data; // Asigna la lista de usuarios a userList
      }
    } catch (error) {}
  }

  async Follow(idFollowing: string, isFollowing: boolean) {
    try {
      const token = await this.storage.get('token');
      const userId = await this.storage.get('userId');
      let endpoint = 'follow';

      if (!isFollowing) {
        endpoint = 'follow';
      } else {
        endpoint = 'unfollow';
      }

      console.log({
        idFollowing: idFollowing,
        userId: userId,
      });

      const follow = await this.fetchApi.request(
        'POST',
        {
          idFollowing: idFollowing,
          userId: userId,
        },
        `/${endpoint}`,
        token
      );
      this.fetchUsers();
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
