import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent implements OnInit {
  @Input() content!: string;
  @Input() username!: string;
  @Input() profilePicture!: string;
  @Input() fullName!: string;
  @Input() createdAt!: Date;

  constructor() {}

  ngOnInit() {}
}
