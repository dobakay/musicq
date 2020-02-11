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
    if(!this.audio) {
      this.audio = document.createElement('audio');
      this.source = document.createElement('source');
      this.audio.appendChild(this.source);
      document.body.appendChild(this.audio);
      this.source.src = url;
      this.audio.setAttribute('autoplay', "");
    }
    
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
