import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { YoutubeApiService } from '../youtube-api/api.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  audio;

  constructor(private apiService: YoutubeApiService) {
    this.audio = new Audio();
  }

  get(url) {
    return this.apiService.get(url);
  }

  load(url) {
    this.audio.src = url;
    this.audio.load();
  }

  play(url, options) {
    this.load(url);
    this.audio.play();
  }

  getPlaylistTracks() {
    // Request for a playlist via Soundcloud using a client id
    return this.apiService.get('https://api.soundcloud.com/playlists/209262931')
      .map(res => res.json())
      .map(data => data.tracks);
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
