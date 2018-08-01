import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocalFileService {

    constructor(private http: Http) {
    }

    public getJSON(filePath): Observable<any> {
        if (!!filePath) {
            return this.http.get(filePath);
        } else {
            throw new Error('No FilePath was provided');
        }

    }
}
