import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, merge, Observable, Subject, Subscription, VirtualTimeScheduler } from 'rxjs';
import { filter, map, mergeMap, repeat, startWith } from 'rxjs/operators';

import { MusicInfoService } from 'src/app/services/music-info.service';

import {Band} from '../../models/model'


import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit {

  refreshDataClickSubject = new Subject<{}>()

  // bandList: Band[] = []
  // bandListSub$:  Subscription;
  // obs_int$: Subscription;


  // spinner
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;




  model$: Observable<{bands: Band[], isLoading: boolean}>

  constructor(private _musicInfoService: MusicInfoService) {
    //  const obs_int = interval(1000).pipe(
    //    map(value => value * value),
    //    filter(value => value % 2 === 0)
    //  )

    //  this.obs_int$ = obs_int.subscribe(
    //    data => console.log(data)
       
    //  )

    // this.bandListSub$ = this._musicInfoService.getBands().subscribe(
    //   bands  => this.bandList = bands
    // )




    // case 2

    // this.bandList$ = this._musicInfoService.getBands()


    



    // case 3 with Subject

    const refreshDataClick$ = this.refreshDataClickSubject.asObservable()

    const refreshTriger$ = refreshDataClick$.pipe(
      startWith({})
    )

    const bandList$ = refreshTriger$.pipe(
      mergeMap(
        () => this._musicInfoService.getBands()
      )
    )

    this.model$ = merge(
      refreshTriger$.pipe(
        map(
          () => ({bands: [], isLoading: true})
        )
      ),
      bandList$.pipe(
        map(
          bands => ({bands: bands, isLoading: false})
        )
      )

    )
    


    // refreshTriger$.subscribe(
    //   v => console.log(v)
    // )

    // bandList$.subscribe(
    //   data => console.log(data)    
    // )

    this.model$.subscribe(
      data => console.log(data)
      
    )

  }

  ngOnInit(): void {

    // setTimeout(
    //   ()=>{
    //     this.obs_int$.unsubscribe()
    //   }, 10 * 1000
    // )
    
  }

  ngOnDestroy() {
    // this.bandListSub$.unsubscribe()
    // this.obs_int$.unsubscribe()
    
  }



}
