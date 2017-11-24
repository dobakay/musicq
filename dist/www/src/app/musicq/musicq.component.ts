import { Component, OnInit } from '@angular/core';
import * as Amplitude from 'amplitudejs';

@Component({
  selector: 'musicq',
  templateUrl: './musicq.component.html',
  styleUrls: ['./musicq.component.scss']
})
export class MusicqComponent implements OnInit {
  currentlyPlaying : string = '';

  constructor() { }

  ngOnInit() {
    Amplitude.init({});
    this.currentlyPlaying = "https://lastfm-img2.akamaized.net/i/u/ar0/bdaf48908c274821bb7c2f3e61079751";
  }

}
