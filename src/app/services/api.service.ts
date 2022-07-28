import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  publicUrl: string = 'http://localhost:3005';
  //publicUrl: string = 'http://54.232.23.102:3010';
  apiUrl: string = `${this.publicUrl}/api`;
  apiPollsUrl: string = `${this.apiUrl}/poll`;
  apiPollsterUrl: string = `${this.apiUrl}/pollster`;
  apiAuthsUrl: string = `${this.apiUrl}/session/signin`;

  constructor(private _httpClient: HttpClient) {}

  postProduct(data: any): Observable<any> {
    return this._httpClient.post<any>(this.apiUrl, data);
  }

  getProduct(): Observable<any> {
    return this._httpClient.get(this.apiUrl);
  }

  putProduct(data: any, id: number) {
    return this._httpClient.put<any>(this.apiUrl + id, data);
  }

  deleteProduct(id: number) {
    return this._httpClient.delete<any>(this.apiUrl + id);
  }

  // pollster
  getAllPollster(): Observable<any> {
    return this._httpClient.get(this.apiPollsterUrl);
  }

  getPollsterById(id: number): Observable<any> {
    return this._httpClient.get(`${this.apiPollsterUrl}/${id}`);
  }

  addPollster(data: any): Observable<any> {
    // mapping object
    data = {
      ...data,
      User: {
        Username: data.Email,
        Password: data.Password,
      },
    };
    console.log(JSON.stringify(data));
    return this._httpClient.post(this.apiPollsterUrl, data);
  }

  auth(authData: any): Observable<any> {
    return this._httpClient.post(`${this.apiAuthsUrl}/2`, authData);
  }
}
