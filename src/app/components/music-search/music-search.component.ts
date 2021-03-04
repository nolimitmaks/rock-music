import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounce, debounceTime, delay, distinctUntilChanged, filter, mergeMap } from 'rxjs/operators';
import { Band } from 'src/app/models/model';
import { MusicInfoService } from 'src/app/services/music-info.service';

@Component({
  selector: 'app-music-search',
  templateUrl: './music-search.component.html',
  styleUrls: ['./music-search.component.scss']
})
export class MusicSearchComponent implements OnInit {

  search$ = new Subject<string>()
  searchResults$: Observable<Band[]>
  

  constructor(
    private _musicInfoService: MusicInfoService
  ) {
    this.searchResults$ = this.search$.pipe(
      
      filter( q => q.length > 2),
      debounceTime(5000),
      
      mergeMap(
        this._musicInfoService.searchBands.bind(_musicInfoService)
      ),
      // tap((v) => delay(1000) )
      distinctUntilChanged()
    )
   }

  ngOnInit(): void { 
  }

}
