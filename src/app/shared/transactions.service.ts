import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';
  constructor(private _httpClient: HttpClient) {}

  getUsers(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/users`);
  }

  getPosts(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/posts`);
  }
  getPhotos(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/photos`);
  }

  getTransactions(): Observable<any[]> {
    return this._httpClient.get<any>(`${this.apiUrl}/transactions`);
  }
}
