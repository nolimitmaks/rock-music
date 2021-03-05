import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicCreateComponent } from './components/music-create/music-create.component';
import { MusicListComponent } from './components/music-list/music-list.component';
import { MusicSearchComponent } from './components/music-search/music-search.component';

const routes: Routes = [
  { path: 'music-list', component: MusicListComponent},
  { path: 'music-search', component: MusicSearchComponent },
  { path: 'music-create', component: MusicCreateComponent},
  
  {path: '', redirectTo: 'music-list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
