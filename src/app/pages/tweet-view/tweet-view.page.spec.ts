import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TweetViewPage } from './tweet-view.page';

describe('TweetViewPage', () => {
  let component: TweetViewPage;
  let fixture: ComponentFixture<TweetViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TweetViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
