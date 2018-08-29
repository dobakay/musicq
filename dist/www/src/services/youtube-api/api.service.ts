import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { google } from 'googleapis';
import { Observable } from 'rxjs/internal/Observable';
// const OAuth2 = google.auth.OAuth2;
// const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {

  private youtubeAPIkey: 'AIzaSyA4POCoWfF4VTyUhaaV6YjGBCFdSrjm6Bw';
  constructor(private http: Http) {
    // this.getJSON().subscribe(data =>  console.log(data), error => console.log(error));
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
