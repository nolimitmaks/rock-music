import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  
  get currentUser(): Observable<User> {

    return of(
      {
        name: 'Maks',
        favoriteBandId: 'a2a6c014-35e7-478f-b4a1-fc83dcfe811x'
        
      }
    ).pipe(
      tap(() => console.log('start fetching user data')),
      delay(10000),
      tap(() => console.log('finished fetching user data'))
    )
  }

}
