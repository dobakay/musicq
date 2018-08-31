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
    this.audio.crossOrigin = 'anonymous';
  }

  get(url) {
    // return this.apiService.get(url);
  }

  load(url) {
    this.audio.src = url;
    this.audio.load();
  }

  play(url, options?) {
    this.load(url);
    let playPromise = this.audio.play();
    // In browsers that don’t yet support this functionality,
    // playPromise won’t be defined.
    if (playPromise !== undefined) {
      playPromise.then(function(a) {
        // Automatic playback started!
      }).catch(function(error) {
        // Automatic playback failed.
        console.log(error);
        // Show a UI element to let the user manually start playback.
      });
    }
  }

  // getPlaylistTracks() {
  //   // Request for a playlist via Soundcloud using a client id
  //   return this.apiService.get('https://api.soundcloud.com/playlists/209262931')
  //     .map(res => res.json())
  //     .map(data => data.tracks);
  // }

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
