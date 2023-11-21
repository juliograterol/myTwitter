import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import FetchApi from './services/fetchapi.service';
import { IonicStorageModule } from '@ionic/storage-angular'; // Importa el módulo de Ionic Storage
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
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(), // Configura Ionic Storage en tu módulo
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FetchApi,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
