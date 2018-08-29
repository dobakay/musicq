import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music-service/music-service.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'musicq',
  templateUrl: './musicq.component.html',
  styleUrls: ['./musicq.component.scss']
})
export class MusicqComponent implements OnInit {
  title;
  position;
  elapsed;
  duration;
  tracks: any[] = [];
  backgroundStyle;

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    // this.musicService.getPlaylistTracks().subscribe(tracks => {
    //   this.tracks = tracks;
    //   this.handleRandom();
    // });
    this.playTestTrack();
    this.musicService.audio.onend = this.handleEnded.bind(this);

    this.musicService.audio.ontimeupdate = this.handleTimeUpdate.bind(this);
  }

  playTestTrack() {
    this.musicService.play('http://localhost:8080/youtube-download/ZTY8vlKO9hg', {});
  }

  handleEnded(e) {
    this.playTestTrack();
  }

  handleTimeUpdate(e) {
    const elapsed = this.musicService.audio.currentTime;
    const duration = this.musicService.audio.duration;
    this.position = elapsed / duration;
    this.elapsed = this.musicService.formatTime(elapsed);
    this.duration = this.musicService.formatTime(duration);
  }

  composeBackgroundStyle(url) {
    return {
      width: '100%',
      height: '600px',
      backgroundSize: 'cover',
      backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),   url(${this.musicService.xlArtwork(url)})`
    };
  }
}
