import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class FetchApi {
  constructor(private http: HttpClient) {}

  async request(
    method: string,
    data: object | null,
    endpoint: string
  ): Promise<any> {
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!validMethods.includes(method)) {
      throw new Error('Método inválido');
    }
    if (method !== 'GET' && data && typeof data !== 'object') {
      throw new Error('Datos inválidos, no es un objeto JSON');
    }

    const options: any = {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    };

    if (method !== 'GET' && data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await this.http
        .request(method, endpoint, options)
        .toPromise();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
