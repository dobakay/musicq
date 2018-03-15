import { Component, OnInit } from '@angular/core';
import * as Amplitude from 'amplitudejs';

@Component({
  selector: 'musicq',
  templateUrl: './musicq.component.html',
  styleUrls: ['./musicq.component.scss']
})
export class MusicqComponent implements OnInit {
  currentlyPlaying: '';

  constructor() { }

  ngOnInit() {
    // Amplitude.init({
    //   "songs":[{
    //     "name": "Pushing buttons",
    //     "artist": "Tha Trickaz",
    //     "album": "Cloud Adventures",
    //     "url": "localhost:3000/youtube-download/ZTY8vlKO9hg;?type=http&nocache=66",
    //     "cover_art_url": "https://lastfm-img2.akamaized.net/i/u/ar0/bdaf48908c274821bb7c2f3e61079751"
    //   }],
    //   'amplitude_live': true,
    //   'amplitude_live_source': "localhost:3000/youtube-download/",
    // });
    // //XMLfBxh4pf8
    // this.currentlyPlaying = "https://lastfm-img2.akamaized.net/i/u/ar0/bdaf48908c274821bb7c2f3e61079751";

  }

}
