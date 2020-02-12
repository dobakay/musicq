import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicqComponent } from './musicq/musicq.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  { path: '', component: MusicqComponent },
  { path: 'player', component: PlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

