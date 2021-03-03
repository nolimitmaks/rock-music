import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicListComponent } from './components/music-list/music-list.component';

const routes: Routes = [
  { path: 'music-list', component: MusicListComponent},
  {path: '', redirectTo: 'music-list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
