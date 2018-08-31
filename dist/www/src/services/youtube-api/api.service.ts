import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/internal/Observable';
import { ScriptsService } from '../external.scripts.service/external.scripts.service';
import { ClientSecret } from './client.secret';
import { resolve } from 'url';
// const OAuth2 = google.auth.OAuth2;
const SCOPE = 'https://www.googleapis.com/auth/youtube.readonly';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {

  constructor(private http: Http, private externalScripts: ScriptsService, private clientCredential: ClientSecret) {
  }

  init():Promise<any> {
    return this.externalScripts.loadScript('GAPI')
                .then((data) => {
                  return this.getGapis();
                })
                .then(() => {
                  return this.authorization();
                })
                .then(() => {
                  return this.setClient();
                })
                .catch((e) => {
                  console.log(e);
                });
  }

  getGapis() {
    return new Promise((resolve, reject) => {
      gapi.load('auth2:client', () => {
        resolve();
      });
    });
  }

  /**
  * Authorize Google Compute Engine API.
  */
  authorization() {
    let gapiKey = sessionStorage.getItem('gapiKey');
    if(!!gapiKey) {
      gapi.client.setToken(gapiKey);
      return Promise.resolve();
    } else {
      return gapi.auth.authorize({
        client_id: this.clientCredential.clientId,
        scope: SCOPE,
        immediate: false
      }, (authResult) => {
            if (authResult && !authResult.error) {
              console.log(authResult);
              sessionStorage.setItem('gapiKey', authResult.access_token);
              // window.alert('Auth was successful!');
              return Promise.resolve();
            } else {
              // window.alert('Auth was not successful');
              console.log(authResult.error);
              return Promise.reject(authResult.error);
            }
      });
    }
  }

  setClient() {
    return new Promise((resolve, reject) => {
      gapi.client.load('youtube', 'v3', () => {
        resolve();
      });
    });
  }

  search(q?) {
    if(gapi.client) {
      let request = gapi.client.youtube.search.list({
        q: q || 'tha trickaz',
        part: 'snippet',
        maxResults: 50
      });
    
      return new Promise((resolve, reject) => {
        request.execute((response) => {
          resolve(response);
        });
      });
    }
  }
}
