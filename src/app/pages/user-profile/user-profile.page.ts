import { Component, OnInit } from '@angular/core';
import FetchApi from 'src/app/services/fetchapi.service';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userInfo: any; // Declarar una propiedad para almacenar los datos de userInfo
  tweets: any[] = [];
  user: any;

  constructor(
    private fetchApi: FetchApi,
    private storage: Storage,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.user = params['user'];
    });
  }

  ngOnInit() {
    this.fetchUser();
  }

  async fetchUser() {
    const token = await this.storage.get('token');
    if (token) {
      const userInfo = await this.fetchApi.request(
        'GET',
        null,
        `/user/profile/${this.user}`,
        token
      );
      if (userInfo && userInfo.data) {
        this.userInfo = userInfo.data;
        console.log(userInfo.data);
      }
      const response = await this.fetchApi.request(
        'GET',
        null,
        `/tweet/user/${this.user}`,
        token
      );

      if (response && response.data && Array.isArray(response.data)) {
        this.tweets = response.data;
      } else {
        this.tweets = [undefined];
      }
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
      this.fetchUser();
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
      this.fetchUser();
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  goBack() {
    this.router.navigate(['tabs/tab2']);
  }
}
