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
        this.userInfo = userInfo.data; // Asignar userInfo.data a la propiedad userInfo
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

  goBack() {
    this.router.navigate(['tabs/tab2']);
  }
}
