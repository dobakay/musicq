import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  clientId = '[CLIENT_ID]';

  constructor(
    private http: Http
  ) { }

  get(url, attachClientId?) {
    // Should attach client id if the attachToken
    // is true
    let u;
    attachClientId ? u = this.prepareUrl(url) : u = url;
    // Returns an obsrevable
    // for the HTTP get request
    return this.http.get(u);
  }

  prepareUrl(url) {
    // Attach client id to stream url
    return `${url}?client_id=${this.clientId}`;
  }

}
