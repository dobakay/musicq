import { Injectable } from '@angular/core';
import { LocalFileService } from '../localfile.service';

@Injectable()
export class AmplitudeService {
    public songs;
    public config;
    constructor(private localFile: LocalFileService) {
        // this.localFile.getJSON('/dist/assets/amplitude.service/songs.json').subscribe(data => this.songs = data, error => console.log(error));
        // this.localFile.getJSON('dist/assets/amplitude.service/amplitude.config.json').subscribe(data => this.config = data, error => console.log(error));
    }
}
