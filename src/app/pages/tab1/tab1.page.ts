import { Component, OnInit } from '@angular/core';
import FetchApi from '../../services/fetchapi.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  tweets: any[] = [];
  selectedSegment: string = 'global';
  lastTweetDate: string = '';

  constructor(
    private fetchApi: FetchApi,
    private storage: Storage,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.fetchTweets();
  }
  handleRefresh(event: any) {
    this.lastTweetDate = '';
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.fetchTweets();
    }, 2000);
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
          `${endpoint}/${userId}?lastTweetDate=${this.lastTweetDate}`,
          token
        );

        if (response && response.data && Array.isArray(response.data)) {
          this.tweets = response.data;
          let tweetsLenght = this.tweets.length;
          if (tweetsLenght > 0) {
            console.log(tweetsLenght);
            this.lastTweetDate = this.tweets[tweetsLenght - 1].createdAt;
            console.log(this.lastTweetDate);
          }
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
    this.lastTweetDate = '';
  }
  async goToUser(user: string) {
    const userId = await this.storage.get('userId');
    if (user === userId) {
      this.router.navigate(['tabs/tab4']);
      //si eres tu, redirige a la cuenta propia
      const toast = await this.toastController.create({
        message: 'This is you',
        duration: 1500,
        position: 'top',
      });
      await toast.present();
    } else {
      this.router.navigate(['user-profile', user]);
    }
  }
  async goToTweet(tweet: string) {
    this.router.navigate(['tweet-view', tweet]);
  }
  onIonInfinite(ev: any) {
    this.fetchTweets();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
