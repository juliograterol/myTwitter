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
    fullName: '',
    user: '',
    email: '',
    password: '',
    bio: '',
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
    const token = await this.storage.get('token');
    const userId = await this.storage.get('userId');
    // Verificar si el usuario está autenticado
    if (file) {
      const path = `/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      console.log(url);
      const response = await this.fetchApi.request(
        'PUT',
        {
          profilePicture: url,
          userId: userId,
        },
        `/user`,
        token
      );
      console.log(response);
    } else {
      const response = await this.fetchApi.request(
        'PUT',
        {
          profilePicture:
            'https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
          userId: userId,
        },
        `/user`,
        token
      );
      console.log('No se seleccionó un archivo.');
    }
  }

  ngOnInit() {}

  goBack() {
    this.presentAlert('Desea salir sin guardar los cambios?', '', 'SALIR');
    this.router.navigate(['tabs/tab4']);
  }

  async presentAlert(header: string, message: string, btnText: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [btnText],
    });

    await alert.present();
  }
}
