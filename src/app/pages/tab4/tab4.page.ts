import { Component, OnInit } from '@angular/core';
import FetchApi from '../../services/fetchapi.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  userData = {};
  tweets: any[] = [];
  selectedSegment: string = 'global';

  constructor(
    private fetchApi: FetchApi,
    private storage: Storage,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchUserData();
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.fetchUserData();
    }, 2000);
  }

  async fetchUserData() {
    try {
      const token = await this.storage.get('token');
      const userId = await this.storage.get('userId');

      if (token) {
        const response = await this.fetchApi.request(
          'GET',
          null,
          `/tweet/user/${userId}`,
          token
        );

        if (response && response.data && Array.isArray(response.data)) {
          this.tweets = response.data;
          console.log(this.tweets);
        } else {
          this.tweets = [];
        }
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
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
      this.fetchUserData();
    } catch (error) {}
  }
  async goToTweet(tweet: string) {
    this.router.navigate(['tweet-view', tweet]);
  }
}
