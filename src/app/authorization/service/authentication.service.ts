import { Oauth } from './../oauth';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {

  private authUrl = 'http://localhost:8180/gateway/auth/oauth/token?grant_type=password&';
  private refreshUrl = 'http://localhost:8180/gateway/auth/oauth/token?grant_type=refresh_token&';
  private clientId = 'gui';
  private clientSecret = 'gui_password';

  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
  });

  constructor(private http: Http) {
  }

  login(login: string, password: string): Observable<boolean> {
    return this.http.post(this.authUrl + `username=${login}&password=${password}`, '', { headers: this.headers })
      .map((response: Response) => {
        const oauth: Oauth = response.json();
        if (oauth && oauth.access_token && oauth.refresh_token) {
          oauth.login = login;
          localStorage.setItem('oauth', JSON.stringify(oauth));
          return true;
        }
        return false;
      }).catch((error: any) => Observable.throw(error.json().error_description || 'Server error'));
  }

  refreshToken(): Observable<boolean> {
    const refresh_token = this.getOauth().refresh_token;
    return this.http.post(this.refreshUrl + `refresh_token=${refresh_token}`, '', { headers: this.headers })
      .map((response: Response) => {
        const oauth: Oauth = response.json();
        if (oauth.access_token && oauth.refresh_token && oauth.access_token !== this.getOauth().access_token) {
          this.refreshOauth(oauth.access_token, oauth.refresh_token);
          return true;
        }
        return false;
      }).catch((error: any) => Observable.throw(error.json().error_description || 'Server error'));
  }

  logout() {
    localStorage.removeItem('oauth');
  }

  private getOauth(): Oauth {
    return JSON.parse(localStorage.getItem('oauth'));
  }

  getAccessToken() {
    let access_token;
    if (this.getOauth()) {
      access_token = this.getOauth().access_token;

    }
    return access_token ? access_token : '';
  }

  private refreshOauth(access_token: string, refresh_token: string) {
    if (this.getOauth()) {
      const oauth = this.getOauth();
      oauth.access_token = access_token;
      oauth.refresh_token = refresh_token;
      localStorage.setItem('oauth', JSON.stringify(oauth));
    }
  }

  isLoggedIn(): boolean {
    const access_token = this.getAccessToken();
    return access_token && access_token.length > 0;
  }
}
