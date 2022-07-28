import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  from,
  map,
  observable,
  Observable,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  UserId: any = -1;
  Username: string = '';
  constructor(private apiServices: ApiService) {
    this.UserId = localStorage.getItem('UserId') || -1;
    this.Username = localStorage.getItem('Username') || '';
  }

  logIn(authData: any): Observable<any> {
    return this.apiServices
      .auth(authData)
      .pipe(map((resp) => this.saveDataLogin(resp)));
  }

  saveDataLogin(response: any): any {
    let { auth, UserId = false } = response;
    if (auth) {
      let {
        data: { Names, Lastnames },
      } = response;

      this.UserId = UserId;
      this.Username = `${Names} ${Lastnames}`;
      console.log(this.UserId);
      window.localStorage.setItem('UserId', this.UserId);
      window.localStorage.setItem('Username', this.Username);
      window.localStorage.setItem('Data', JSON.stringify(response));
      console.log(window.localStorage);
    }
    return response;
  }
  logout(): void {
    localStorage.removeItem('UserId');
    localStorage.removeItem('Username');
    localStorage.removeItem('Data');
    this.UserId = -1;
    this.Username = '';
    //this._router.navigate([redirect]);
  }

  isAuthenticated(): boolean {
    return this.UserId != -1;
  }

  getUsername(): string {
    return this.Username;
  }
}
