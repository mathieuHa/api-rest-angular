import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  api: string;
  constructor(private http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
    this.api = 'http://localhost/base_symfony3_secure_api/web/app_dev.php/api/';
  }
  // Login a user
  // Normally make a server request and store
  // e.g. the auth token
  login(username, password): Observable<any> {
    const body = {
      '_username': username,
      '_password': password,
    };
    return this.http
      .post(this.api + 'login_check', body);
  }
  register(username, email, password1, password2): Observable<any> {
    const body = {
      'username': username,
      'email': email,
      'plainPassword': {
        'first': password1,
        'second': password2
      }
    };
    return this.http
      .post(this.api + 'register', body);
  }

  // Logout a user, destroy token and remove
  // every information related to a user
  logout(): void {
    localStorage.removeItem('token_user');
  }

  // Returns whether the user is currently authenticated
  // Could check if current token is still valid
  authenticated(): boolean {
    return !!localStorage.getItem('token_user');
  }
  getToken (): string {
    return localStorage.getItem('token_user');
  }
}
