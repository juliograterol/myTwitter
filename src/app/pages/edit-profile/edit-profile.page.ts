import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import FetchApi from 'src/app/services/fetchapi.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userData = {
    profilePicture: '',
    fullName: '',
    username: '',
    email: '',
    password: '',
    bio: '',
    userId: '',
  };

  constructor(
    private router: Router,
    private fireStorage: AngularFireStorage,
    private alertController: AlertController,
    private storage: Storage,
    private fetchApi: FetchApi
  ) {}

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const path = `/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      this.userData.profilePicture = url;
    } else {
      this.userData.profilePicture =
        'https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg';
    }
  }

  async EditProfile() {
    try {
      const token = await this.storage.get('token');
      const response = await this.fetchApi.request(
        'PUT',
        this.userData,
        `/user`,
        token
      );
      this.presentAlert('Cambios Guardados!', '', [{ text: 'OK' }]);
      this.router.navigate(['tabs/tab4']);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {
    this.getOldData();
  }

  async getOldData() {
    try {
      const token = await this.storage.get('token');
      const userId = await this.storage.get('userId');

      const userOld = await this.fetchApi.request(
        'GET',
        null,
        `/user/profile/${userId}`,
        token
      );

      if (userOld && userOld.data) {
        this.userData = userOld.data;
        this.userData.userId = userId;
      }
    } catch (error) {
      console.log('Error obteniendo datos del usuario: ', error);
    }
  }

  goBack() {
    this.presentAlert('Desea salir sin guardar los cambios?', '', [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'SALIR',
        role: 'confirm',
        handler: () => {
          this.router.navigate(['tabs/tab4']);
        },
      },
    ]);
  }

  async presentAlert(header: string, message: string, buttons: any[]) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: buttons,
    });

    await alert.present();
  }
}
