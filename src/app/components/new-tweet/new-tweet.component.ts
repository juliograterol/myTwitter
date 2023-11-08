import { Component } from '@angular/core';
import FetchApi from 'src/app/services/fetchapi.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.scss'],
})
export class NewTweetComponent {
  tweetContent = {
    content: '',
  };
  isModalOpen = false;

  constructor(private fetchApi: FetchApi, private storage: Storage) {}

  async postTweet() {
    try {
      const token = await this.storage.get('token');
      const userId = await this.storage.get('userId');
      const response = await this.fetchApi.request(
        'POST',
        {
          content: this.tweetContent.content,
          userId: userId,
        },
        `/tweet/`,
        token
      );
      this.setOpen(false);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
