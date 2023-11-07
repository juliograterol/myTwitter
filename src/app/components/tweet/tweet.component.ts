import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent implements OnInit {
  @Input() content!: string;
  @Input() idUser!: string;
  @Input() createdAt!: string; //Cambiar a Date

  constructor() {}

  ngOnInit() {}
}
