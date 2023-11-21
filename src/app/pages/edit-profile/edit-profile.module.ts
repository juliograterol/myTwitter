import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditProfilePageRoutingModule } from './edit-profile-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { EditProfilePage } from './edit-profile.page';
import { AlertController } from '@ionic/angular';

const firebaseConfig = {
  apiKey: 'AIzaSyBRG-DALWDfyDyR2namzhNT-7sFlQgAq8g',
  authDomain: 'mytwitter-c9c02.firebaseapp.com',
  projectId: 'mytwitter-c9c02',
  storageBucket: 'mytwitter-c9c02.appspot.com',
  messagingSenderId: '34051252426',
  appId: '1:34051252426:web:bb08b6892dac08fcead433',
  measurementId: 'G-NTKZC61HKY',
};
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfilePageRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
  ],
  declarations: [EditProfilePage],
})
export class EditProfilePageModule {}
