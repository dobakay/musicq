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
      gapi.load('auth:client', () => {
        resolve();
      });
    });
  }

  /**
  * Authorize Google Compute Engine API.
  */
  authorization() {
      return gapi.auth.authorize({
        client_id: this.clientCredential.clientId,
        scope: SCOPE,
        immediate: false
      }, (authResult) => {
            if (authResult && !authResult.error) {
              // window.alert('Auth was successful!');
              return Promise.resolve();
            } else {
              // window.alert('Auth was not successful');
              console.log(authResult.error);
              return Promise.reject(authResult.error);
            }
      });
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
        part: 'snippet'
      });
    
      return new Promise((resolve, reject) => {
        request.execute((response) => {
          resolve(response);
        });
      });
    }
  }

  prepareUrl(url) {
    return `${url}`;
  }

  get(url) {
    // Returns an obsrevable
    // for the HTTP get request
    return this.http.get(url);
  }

  authorize(credentials, callback) {
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    // const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
  }

  // public getJSON(): Observable<any> {
  //   return this.http.get('../assets/client_secret_json.json')
  //     .map((res: any) => res.json());
  // }
}
