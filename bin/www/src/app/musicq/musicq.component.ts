import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music-service/music-service.service';
import { YoutubeApiService } from '../../services/youtube-api/api.service';
import { Observable, from, of} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map, filter, catchError, mergeMap, flatMap } from 'rxjs/operators';

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
  searchMatches: any[] = [];

  constructor(private musicService: MusicService, private youtube: YoutubeApiService) {}

  ngOnInit() {
    this.youtube.init().then(() => {
      setTimeout(() => { // DIRTY HACK
        this.search({_query: 'backspin33rpm'});
      }, 100);
      
    });
  }

  search(e) {
    this.searchMatches = [];
    from(this.youtube.searchHeadless(e._query))
    .subscribe((val: any) => {
      console.log(val);
      this.searchMatches = val;
    });
  }

  playTestTrack() {
    this.musicService.play('http://localhost:8080/youtube-download/ZTY8vlKO9hg', {});
  }

  play(e) {
    this.musicService.play('http://localhost:8080/youtube-download/'+ e.songId, {});
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
