import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicComponent } from './components/music/music.component';
import { MusicListComponent } from './components/music-list/music-list.component';
import { GithubApiComponent } from './components/github-api/github-api.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MusicSearchComponent } from './components/music-search/music-search.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MusicCreateComponent } from './components/music-create/music-create.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    MusicComponent,
    MusicListComponent,
    GithubApiComponent,
    MusicSearchComponent,
    MusicCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
  ],
  providers: [ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
