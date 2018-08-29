import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// API services
import { YoutubeApiService } from '../services/youtube-api/api.service';
import {ApiService } from '../services/api/api.service';

// Music service
import { MusicService } from '../services/music-service/music-service.service';

import { LocalFileService } from '../services/localfile.service';


// components
import { AppComponent } from './app.component';
import { MusicqComponent } from './musicq/musicq.component';


@NgModule({
  declarations: [
    AppComponent,
    MusicqComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    LocalFileService,
    MusicService,
    YoutubeApiService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
