import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FetchManager {
  private baseUrl: string;
  private timeout: number;

  constructor(private http: HttpClient) {
    this.baseUrl = ''; // Coloca tu URL base aquí
    this.timeout = 5000; // Establece tu tiempo de espera aquí (opcional)
  }

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
        .request(method, this.baseUrl + endpoint, options)
        .toPromise();
      return response;
    } catch (error) {
      throw new Error(`Error en la solicitud: ${error}`);
    }
  }
}
