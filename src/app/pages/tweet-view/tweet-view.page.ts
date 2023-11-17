import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import FetchApi from 'src/app/services/fetchapi.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tweet-view',
  templateUrl: './tweet-view.page.html',
  styleUrls: ['./tweet-view.page.scss'],
})
export class TweetViewPage implements OnInit {
  tweetId: any;
  tweet: any;
  tweets: any[] = [];
  userId: any;

  constructor(
    private fetchApi: FetchApi,
    private storage: Storage,
    private route: ActivatedRoute,
    private router: Router,
    private fireStorage: AngularFireStorage,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.route.params.subscribe((params) => {
      this.tweetId = params['tweet'];
    });
  }
  @ViewChild('tweetInput', { read: ElementRef }) tweetInput!: ElementRef;

  ngOnInit() {
    this.fetchTweet();
    this.fetchReplies();
  }

  async fetchTweet() {
    try {
      const token = await this.storage.get('token');
      const userId = await this.storage.get('userId');
      if (token) {
        const tweetInfo = await this.fetchApi.request(
          'GET',
          null,
          `/tweet/${this.tweetId}`,
          token
        );
        this.tweet = tweetInfo.data;
        this.userId = userId;
        console.log(tweetInfo);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fetchReplies() {
    try {
      const token = await this.storage.get('token');

      if (token) {
        const response = await this.fetchApi.request(
          'GET',
          null,
          `/tweet/replies/${this.tweetId}`,
          token
        );

        if (response && response.data && Array.isArray(response.data)) {
          this.tweets = response.data;
        }
        console.log(response);
      }
    } catch (error) {
      this.tweets = [];
    }
  }

  async deleteConfirmation() {
    this.chooseAlert(
      'Estas seguro de querer borrar este tweet?',
      'Una vez borrado, no se podra recuperar',
      [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            console.log('Alert confirmed');
            this.deleteTweet();
          },
        },
      ]
    );
  }

  async deleteTweet() {
    try {
      const token = await this.storage.get('token');
      const userId = await this.storage.get('userId');
      const deletedTweet = await this.fetchApi.request(
        'DELETE',
        null,
        `/tweet/${this.tweetId}/${userId}`,
        token
      );
      this.goBack();
      this.chooseAlert('Tweet ha sido eliminado con exito', '', [
        {
          text: 'OK',
        },
      ]);
    } catch (error) {
      this.chooseAlert(
        'No se ha podido eliminar el tweet',
        'Intentalo más tarde.',
        [
          {
            text: 'Aceptar',
          },
        ]
      );
      console.log('No se borro el tweet: ', error);
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
  /////////////////////////
  // Responder al Tweet: //
  /////////////////////////

  tweetContent = {
    content: '',
  };
  isModalOpen = false;
  selectedFiles: string[] = [];
  selectedFileNames: string[] = [];

  async postTweet() {
    try {
      const token = await this.storage.get('token');
      const userId = await this.storage.get('userId');
      const response = await this.fetchApi.request(
        'POST',
        {
          content: this.tweetContent.content,
          attachmentUrls: this.selectedFiles,
          userId: userId,
          isReply: this.tweetId,
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
    if (isOpen && this.tweetInput) {
      setTimeout(() => {
        this.tweetInput.nativeElement.focus();
      }, 500);
    }
  }

  focusInput(): void {
    if (this.tweetInput) {
      this.tweetInput.nativeElement.focus();
    }
  }

  async handleFileInput(event: any) {
    const files = event.target.files;

    for (let i = 0; i < Math.min(files.length, 4); i++) {
      const file = files[i];
      const path = `/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      this.selectedFiles.push(url);
      this.selectedFileNames.push(file.name);
    }
  }
  ///Redirect
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

  //Alerta
  async chooseAlert(header: string, message: string, buttons: any[]) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: buttons,
    });

    await alert.present();
  }
}
