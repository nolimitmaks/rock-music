import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription, VirtualTimeScheduler } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { MusicInfoService } from 'src/app/services/music-info.service';

import {Band} from '../../models/model'



@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit {

  // bandList: Band[] = []
  // bandListSub$:  Subscription;
  // obs_int$: Subscription;


  bandList$: Observable<Band[]>

  // case 2

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

    this.bandList$ = this._musicInfoService.getBands()




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
