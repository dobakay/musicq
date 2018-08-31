import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/internal/Observable';
import { ScriptsService } from '../external.scripts.service/external.scripts.service';
import { ClientSecret } from './client.secret';
import { resolve } from 'url';
// const OAuth2 = google.auth.OAuth2;
const SCOPES = ['https://www.googleapis.com/auth/plus.me',
                'https://www.googleapis.com/auth/youtube.readonly',
                'https://www.googleapis.com/auth/youtube'
              ];

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {
  private GoogleAuth;
  private user;
  constructor(private http: Http, private externalScripts: ScriptsService, private clientCredential: ClientSecret) {
  }

  async init():Promise<any> {
    await this.externalScripts.loadScript('GAPI');
    await this.getGapis();
    await this.authorization();
    await this.setClient();
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
    return new Promise((resolve, reject) => {
      gapi.client.init({
        apiKey: this.clientCredential.apiToken,
        clientId: this.clientCredential.clientId,
        scope: SCOPES.join(' '),
      }).then(()=> {
        this.GoogleAuth = gapi.auth2.getAuthInstance();
        this.GoogleAuth.signIn();
        this.user = this.GoogleAuth.currentUser.get();
        this.user.grant({scope: SCOPES.join(' ')});
        return resolve();
      });
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
    if(!!gapi.client && !!gapi.client.youtube) {
      let request = gapi.client.youtube.search.list({
        q: q || 'tha trickaz',
        part: 'snippet',
        type:'video',
        forDevelopers: true,
        maxResults: 50
      });
    
      return new Promise((resolve, reject) => {
        request.execute((response) => {
          resolve(response);
        });
      });
    }
    console.log(gapi.client);
    return Promise.reject(new Error('no youtube client'));
  }
}
