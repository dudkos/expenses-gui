import { ExpensesError } from './expenses-error';
import { AlertService } from './../alert/service/alert.service';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './../authorization/service/authentication.service';
import { Router, NavigationStart } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RequestService {

  private baseUrl = `http://localhost:8180/gateway/`;

  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  private options = new RequestOptions({
    headers: this.headers
  });

  constructor(private http: Http, private router: Router,
     private authenticationService: AuthenticationService, private alertService: AlertService) {
  }

  get(url: string): Promise<any> {
    return this.handleRequest(this.baseUrl + url, RequestMethod.Get);
  }

  delete(url: string): Promise<void> {
    return this.handleRequest(this.baseUrl + url, RequestMethod.Delete, '', true);
  }

  put(url: string, body: any, isVoid?: boolean): Promise<any> {
    return this.handleRequest(this.baseUrl + url, RequestMethod.Put, body, isVoid);
  }

  post(url: string, body: any): Promise<any> {
    return this.handleRequest(this.baseUrl + url, RequestMethod.Post, body, true, new Headers());
  }

  private handleRequest(url: string, method: RequestMethod, body?: any, isVoid?: boolean, headers?: Headers): Promise<any> {
    const requestHeaders: Headers = headers === undefined ? this.headers : headers;
    this.updateAuthorizationHeader(requestHeaders);
    return this.http.request(url, { headers: requestHeaders, method: method, body: body })
      .toPromise()
      .then(response => isVoid !== undefined ? null : response.json() as any)
      .catch((error: any) => {
        const er = this.resolveError(error);
        if (this.isOauthRefreshTockenError(er)) {
          return this.handleOauthRefreshRequest(url, method, body, isVoid, headers);
        } else {
          this.handleError(error);
        }
      });
  }

  private handleOauthRefreshRequest(url: string, method: RequestMethod, body?: any, isVoid?: boolean, headers?: Headers): Promise<any> {
    return this.authenticationService.refreshToken().toPromise().then(response => {
      if (response) {
        return this.handleRequest(url, method, body, isVoid, headers);
      }
    }).catch((error: any) => {
      this.handleError(error);
    });
  }

  private isOauthRefreshTockenError(er: ExpensesError): boolean {
    return er && er.status === 401 && er.message === 'invalid_token';
  }

  private handleError(error: any): Promise<any> {
    this.alertService.error(error.message || 'Server error');
    return Promise.reject(error);
  }

  private resolveError(error: any) {
    const er = new ExpensesError();
    er.message = error.json().message ? error.json().message : error.json().error;
    er.description = error.json().description ? error.json().description : error.json().error_description;
    er.status = error.status;
    return er;
  }

  private updateAuthorizationHeader(headers: Headers) {
    headers.delete('Authorization');
    headers.append('Authorization', 'Bearer ' + this.authenticationService.getAccessToken());
  }

  private deleteHeader(name: string) {
    this.headers.delete(name);
  }

  private addHeader(name: string, value: string) {
    this.headers.append(name, value);
  }

  public upload(url: string, fiels: FileList): Promise<void> {
    if (fiels.length > 0) {
      const file: File = fiels[0];
      const formData = new FormData();
      formData.append('file', file, file.name);
      return this.post(url, formData);
    }
  }
}
