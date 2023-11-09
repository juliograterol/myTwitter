import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TweetViewPageRoutingModule } from './tweet-view-routing.module';

import { TweetViewPage } from './tweet-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TweetViewPageRoutingModule
  ],
  declarations: [TweetViewPage]
})
export class TweetViewPageModule {}
