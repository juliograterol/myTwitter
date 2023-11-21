import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class FetchApi {
  constructor(private http: HttpClient) {}

  // private baseUrl = 'http://localhost:3000';
  private baseUrl = 'https://long-blue-mackerel.cyclic.app';

  async request(
    method: string,
    data: object | null,
    endpoint: string,
    token?: string,
    params?: any
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

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    let fullUrl = this.baseUrl + endpoint;

    if (params) {
      const queryParams = Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&');
      fullUrl += `?${queryParams}`;
    }

    try {
      const response = await this.http
        .request(method, fullUrl, options)
        .toPromise();
      return response;
    } catch (error) {
      console.error(error);
      throw error; // Relanzar el error para que los consumidores del servicio puedan manejarlo
    }
  }
}
