import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}

  ngOnInit() {}
  goBack() {
    this.router.navigate(['tabs/tab4']);
  }
}
