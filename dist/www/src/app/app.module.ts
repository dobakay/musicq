import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// APIs Dependencies
import { ScriptsService } from '../services/external.scripts.service/external.scripts.service';

// API services
import { ClientSecret } from '../services/youtube-api/client.secret';
import { YoutubeApiService } from '../services/youtube-api/api.service';
import {ApiService } from '../services/api/api.service';

// Music service
import { MusicService } from '../services/music-service/music-service.service';

import { LocalFileService } from '../services/localfile.service';


// components
import { AppComponent } from './app.component';
import { MusicqComponent } from './musicq/musicq.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    AppComponent,
    MusicqComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    LocalFileService,
    ScriptsService,
    MusicService,
    ClientSecret,
    YoutubeApiService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
