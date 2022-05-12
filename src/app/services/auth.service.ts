import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { baseurl } from './baseurl';
import { IAuth } from './service.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = baseurl + '/AdminLogs';

  constructor(private http: HttpClient) { }

  public login(payload: IAuth) {
    const httpOptions = this.httpClientHeaders();

    return this.http.post(this.loginUrl, payload, httpOptions);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');

    // try {
    //   console.log('token: ', token)
    //   console.log('now: ', Date.now() + 300)

    //   return parseInt(token) < Date.now() + 300;
    // } catch (error) {
    //   return false
    // }

    return true;
  }

  private httpClientHeaders() {
    return {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json'
        }
      )
    }
  }
}
