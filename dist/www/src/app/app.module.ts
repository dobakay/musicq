import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// services
import { LocalFileService } from '../services/localfile.service';
import { AmplitudeService } from '../services/amplitude.service/amplitude.service';

// components
import { AppComponent } from './app.component';
import { MusicqComponent } from './musicq/musicq.component';


@NgModule({
  declarations: [
    AppComponent,
    MusicqComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ AmplitudeService,
                LocalFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
