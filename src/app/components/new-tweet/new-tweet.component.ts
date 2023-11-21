import { Component, ElementRef, ViewChild } from '@angular/core';
import FetchApi from 'src/app/services/fetchapi.service';
import { Storage } from '@ionic/storage-angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

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
  selectedFiles: string[] = [];
  selectedFileNames: string[] = [];

  @ViewChild('tweetInput', { read: ElementRef }) tweetInput!: ElementRef;

  constructor(
    private fetchApi: FetchApi,
    private storage: Storage,
    private fireStorage: AngularFireStorage,
    private alertController: AlertController
  ) {}

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

  async postConfirmation() {
    this.chooseAlert('Estas seguro de querer publicar este tweet?', '', [
      {
        text: 'Seguir escribiendo',
        role: 'cancel',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'Publicar',
        role: 'confirm',
        handler: () => {
          console.log('Alert confirmed');
          this.postTweet();
        },
      },
    ]);
  }

  async handleFileInput(event: any) {
    // Manejar la selección de archivos y limitar a 4 archivos
    const files = event.target.files;

    for (let i = 0; i < Math.min(files.length, 4); i++) {
      const file = files[i];
      const path = `/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      this.selectedFiles.push(url);
      this.selectedFileNames.push(file.name); // Agregar el nombre del archivo al nuevo array
    }
  }
  async chooseAlert(header: string, message: string, buttons: any[]) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: buttons,
    });

    await alert.present();
  }
}
