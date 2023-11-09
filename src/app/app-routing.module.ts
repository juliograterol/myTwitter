import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard], // Proteger el acceso a 'tabs' con el guardia de ruta
  },
  {
    path: 'user-profile/:user',
    loadChildren: () =>
      import('./pages/user-profile/user-profile.module').then(
        (m) => m.UserProfilePageModule
      ),
    canActivate: [AuthGuard], // Proteger el acceso a 'tabs' con el guardia de ruta
  },
  {
    path: 'tweet-view/:tweet',
    loadChildren: () =>
      import('./pages/tweet-view/tweet-view.module').then(
        (m) => m.TweetViewPageModule
      ),
    canActivate: [AuthGuard], // Proteger el acceso a 'tabs' con el guardia de ruta
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
