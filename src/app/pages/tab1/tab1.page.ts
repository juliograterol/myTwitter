import { Component, OnInit } from '@angular/core';
import FetchApi from '../../services/fetchapi.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  tweets: any[] = [];
  selectedSegment: string = 'global';

  constructor(
    private fetchApi: FetchApi,
    private storage: Storage,
    private router: Router
  ) {}

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

  startFollowing() {
    this.router.navigate(['/tabs/tab2']);
  }

  async LikeTweet(tweetId: string, isLiked: boolean) {
    try {
      const token = await this.storage.get('token');
      const userId = await this.storage.get('userId');
      let endpoint = 'like';
      if (!isLiked) {
        endpoint = 'like';
      } else {
        endpoint = 'dislike';
      }
      console.log({
        userId: userId,
        tweetId: tweetId,
      });
      const likeTweet = await this.fetchApi.request(
        'POST',
        {
          userId: userId,
          tweetId: tweetId,
        },
        `/${endpoint}`,
        token
      );
      this.fetchTweets();
    } catch (error) {}
  }

  onSegmentChanged(event: CustomEvent) {
    this.selectedSegment = event.detail.value;
    this.fetchTweets();
  }
}
