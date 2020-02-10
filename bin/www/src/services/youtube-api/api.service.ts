import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, filter, catchError, mergeMap, flatMap } from 'rxjs/operators';
import { ScriptsService } from '../external.scripts.service/external.scripts.service';
import { ClientSecret } from './client.secret';
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
  constructor(private http: HttpClient, private externalScripts: ScriptsService, private clientCredential: ClientSecret) {
  }

  async init(): Promise<any> {
    // await this.externalScripts.loadScript('GAPI');
    // await this.getGapis();
    // await this.authorization();
    // await this.setClient();
    return Promise.resolve();
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
      }).then(() => {
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
    if (!!gapi.client && !!gapi.client.youtube) {
      const request = gapi.client.youtube.search.list({
        q: q || 'tha trickaz',
        part: 'snippet',
        type: 'video',
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

  async extractThumbnails(res) {
    const data = await res[1];
    // tslint:disable-next-line:max-line-length
    return data.response.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
  }

  searchHeadless(q?) {
    try {
      return this.http.get('http://localhost:8080/search-youtube/?q=' + q)
        // .pipe(map(this.extractThumbnails),
        //   flatMap((item) => item),
        //   flatMap((item) => item),
        //   filter((item) => {
        //     return Object.keys(item).indexOf('videoRenderer') !== -1;
        //   }),
        //   map(o => o['videoRenderer']),
        //   map((o) => {
        //     return {
        //       lengthText: o.lengthText,
        //       title: o.title,
        //       id: o.videoId,
        //       thumbnail: o.thumbnail,
        //       fullObject: o
        //     };
        //   })
        // );
        .subscribe((val) => {
          console.log(val);
          return new Observable();
        });
    } catch (error) {
      console.log(error);
    }
        // map((o) => {
        //   return {
        //     lengthText: o.lengthText,
        //     title: o.title,
        //     id: o.videoId,
        //     thumbnail: o.thumbnail,
        //     fullObject: o
        //   }
        // }))
  }
}
