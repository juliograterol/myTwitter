import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTweetComponent } from './new-tweet.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

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
  declarations: [NewTweetComponent],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
  ],
  exports: [NewTweetComponent],
})
export class NewTweetModule {}
