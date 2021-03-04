import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, Subscription } from 'rxjs';
import { bufferCount, bufferTime } from 'rxjs/operators';
import { Band } from './models/model';
import { MusicInfoService } from './services/music-info.service';

interface Test {
  s: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rock-music';


  sub$: Subscription

  constructor(

    


    private _musicInfoService: MusicInfoService,
    private _toastr: ToastrService


  ) {
    this.sub$ = this._musicInfoService.getUpdates()
    .pipe(
      bufferTime(2000),
      // bufferCount(2) 
    )
    .subscribe(
      bands => {

        const band_names = bands.map(
          band => band.name
          
        )
        .join(' ')

        this._toastr.info(`Music band ${band_names} has been updated`)
      }  
    )



  }

  ngOnInit() {
    setTimeout(
      () => this.sub$.unsubscribe(), 10 * 1000
    )
  }
}
