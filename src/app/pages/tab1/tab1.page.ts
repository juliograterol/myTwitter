import { Component, OnInit } from '@angular/core';
import FetchApi from '../../services/fetchapi.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  tweets: any[] = [];
  selectedSegment: string = 'global';

  constructor(private fetchApi: FetchApi, private storage: Storage) {}

  ngOnInit() {
    this.fetchTweets();
  }

  async fetchTweets() {
    try {
      const token = await this.storage.get('token');
      const userId = await this.storage.get('userId');

      if (token) {
        let endpoint = '';

        if (this.selectedSegment === 'global') {
          endpoint = '/tweet/allTweets';
        } else if (this.selectedSegment === 'following') {
          endpoint = `/tweet/feed`;
        }
        console.log(endpoint);
        const response = await this.fetchApi.request(
          'GET',
          null,
          `${endpoint}/${userId}`,
          token
        );

        if (response && response.data && Array.isArray(response.data)) {
          this.tweets = response.data;
        }
      }
    } catch (error) {
      this.tweets = [];
    }
  }

  onSegmentChanged(event: CustomEvent) {
    this.selectedSegment = event.detail.value;
    this.fetchTweets();
  }
}
