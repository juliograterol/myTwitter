import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import FetchApi from '../services/fetchapi.service';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LoginPageRoutingModule],
  declarations: [LoginPage],
  providers: [FetchApi],
})
export class LoginPageModule {}
