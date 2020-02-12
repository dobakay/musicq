import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
import { SearchComponent } from './search/search.component';
import { AppRoutingModule } from './app-routing.module';
import { PlayerComponent } from './player/player.component';
import { PlayerControlsComponent } from './player/player-controls/player-controls.component';
import { PlayListComponent } from './player/play-list/play-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MusicqComponent,
    CardComponent,
    SearchComponent,
    PlayerComponent,
    PlayerControlsComponent,
    PlayListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
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
