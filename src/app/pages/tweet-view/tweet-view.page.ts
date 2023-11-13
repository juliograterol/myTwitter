import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import FetchApi from 'src/app/services/fetchapi.service';

@Component({
  selector: 'app-tweet-view',
  templateUrl: './tweet-view.page.html',
  styleUrls: ['./tweet-view.page.scss'],
})
export class TweetViewPage implements OnInit {
  tweetId: any;
  tweet: any;
  user: any;
  constructor(
    private fetchApi: FetchApi,
    private storage: Storage,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.tweetId = params['tweet'];
    });
  }

  ngOnInit() {
    this.fetchTweet();
  }

  async fetchTweet() {
    const token = await this.storage.get('token');
    if (token) {
      const tweetInfo = await this.fetchApi.request(
        'GET',
        null,
        `/tweet/${this.tweetId}`,
        token
      );
      if (tweetInfo && tweetInfo.data) {
        this.tweet = tweetInfo.data;
        const userInfo = await this.fetchApi.request(
          'GET',
          null,
          `/user/profile/${this.tweet.idUser}`,
          token
        );
        this.user = userInfo.data;
        console.log('usuario: ', userInfo.data);
      }
      console.log(tweetInfo);
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
      this.fetchTweet();
    } catch (error) {}
  }
  goBack() {
    this.router.navigate(['tabs/tab1']);
  }
}
