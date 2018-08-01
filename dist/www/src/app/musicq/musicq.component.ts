import { Component, OnInit } from '@angular/core';
import * as Amplitude from 'amplitudejs';
import { AmplitudeService } from '../../services/amplitude.service/amplitude.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'musicq',
  templateUrl: './musicq.component.html',
  styleUrls: ['./musicq.component.scss']
})
export class MusicqComponent implements OnInit {
  currentlyPlaying: '';
  constructor(private service: AmplitudeService) { }

  ngOnInit() {
    Amplitude.init({
      songs: [
        {
          name: 'Pushing buttons',
          artist: 'Tha Trickaz',
          album: 'Cloud Adventures',
          url: 'http://localhost:8080/youtube-download/ZTY8vlKO9hg',// ;?type=http&nocache=66",
          cover_art_url: 'https://lastfm-img2.akamaized.net/i/u/ar0/bdaf48908c274821bb7c2f3e61079751',
          'live': true
        }
      ],
      config: {
        amplitude_live: true,
        amplitude_live_source: 'http://localhost:8080/youtube-download/ZTY8vlKO9hg'
      },
      autoplay: true
    });
  }

}
