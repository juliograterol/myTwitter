import { Component } from '@angular/core';
import { FetchManager } from './fetch-manager.service';

@Component({
  selector: 'app-my-component',
  template: '<div>{{ responseData | json }}</div>',
})
export class MyComponent {
  responseData: any;

  constructor(private fetchManager: FetchManager) {
    this.makeRequest();
  }

  async makeRequest() {
    try {
      this.responseData = await this.fetchManager.request(
        'GET',
        null,
        '/api/data'
      );
    } catch (error) {
      console.error(error);
    }
  }
}
