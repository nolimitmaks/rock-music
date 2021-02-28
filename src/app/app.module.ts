import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicComponent } from './components/music/music.component';
import { MusicListComponent } from './components/music-list/music-list.component';
import { GithubApiComponent } from './components/github-api/github-api.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicComponent,
    MusicListComponent,
    GithubApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
