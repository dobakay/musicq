import { Injectable } from '@angular/core';
import { YoutubeApiService } from '../youtube-api/api.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  audio;
  source;

  constructor(private apiService: YoutubeApiService) {
  }

  get(url) {
    // return this.apiService.get(url);
  }

  play(url, options?) {
    if(this.audio) {
      this.source.src = url;
      this.audio.load();
    } else {
      this.audio = document.createElement('audio');
      this.source = document.createElement('source');
      this.audio.appendChild(this.source);
      document.body.appendChild(this.audio);
      this.source.src = url;
      this.audio.load();
    }
    this.audio.play();
  }

  randomTrack(tracks) {
    const trackLength = tracks.length;
    // Pick a random number
    const randomNumber = Math.floor((Math.random() * trackLength) + 1);
    // Return a random track
    return tracks[randomNumber];
  }

  formatTime(seconds) {
    let minutes: any = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : '0' + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : '0' + seconds;
    return minutes + ':' + seconds;
  }

  findTracks(value) {
  }

  xlArtwork(url) {
    return url.replace(/large/, 't500x500');
  }
}
