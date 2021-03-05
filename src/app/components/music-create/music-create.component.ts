import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, mapTo, reduce, scan, take, takeLast } from 'rxjs/operators';


interface Action {
  type: string;
  payload?: any;
}

interface State {
  history: any;
  undoing: boolean;
}

@Component({
  selector: 'app-music-create',
  templateUrl: './music-create.component.html',
  styleUrls: ['./music-create.component.scss']
})
export class MusicCreateComponent implements OnInit {

  undoClick$ = new Subject()
  action$: Observable<Action>

  readonly localStorageKey = 'music-create-snapshot'

  currentYear: number
  bandForm: FormGroup


  constructor(
    private _fb: FormBuilder
  ) {
    this.currentYear = new Date().getFullYear()

    this.bandForm  = this._fb.group({
      name: ['', Validators.required],
      formationYear: [this.currentYear, Validators.max(this.currentYear)],
      isActive: false,
      biography: ''

    })


    this.action$ = merge(
      this.undoClick$.pipe(
        mapTo({type: 'UNDO'})
      ),
      this.bandForm.valueChanges.pipe(
        debounceTime(500),
        map(
          s => ({type: 'VALUE_CHANGE', payload: s})
        )
      )
    )

    const reducer = (state: State, action: Action) => {
      switch (action.type) {
        case 'VALUE_CHANGE':
          return {
            undoing: false,
            history: state.undoing ? state : [...state.history, action.payload]
          }
        case 'UNDO':
          return {
            undoing: true,
            history: state.history.length < 1 ? state.history : state.history.slice(0, state.history.length - 1)
          }
      
      }
    }

    const initialState: State = {
      history: [],
      undoing: false
    }

    const state$ =  this.action$.pipe(
      scan(reducer, initialState)
    )

    state$.subscribe(
      state => {
        console.log('state$',state)

        if(state.undoing) {
          this.bandForm.setValue(state.history[state.history.length - 1])
        }
      }
      
    )
    
   }

  ngOnInit(): void {

    this.bandForm.valueChanges.pipe(
      debounceTime(1000),
      // filter(
      //   () => this.bandForm.valid
      // )
    ).subscribe(
      formState => localStorage.setItem(this.localStorageKey, JSON.stringify(formState)) 
    )

    const formStateSerialized = localStorage.getItem(this.localStorageKey)

    if(formStateSerialized !== null) {
      const formState = JSON.parse(formStateSerialized)

      this.bandForm.setValue(formState)
    }
   
    
  }



  

  // resetForm() {

  //   const bandForm = this.bandForm
    
  //   bandForm.reset({
  //     name: '',
  //     formationYear: this.currentYear,
  //     isActive: false,
  //     biography: ''

  //   })

  //   if(Object.keys(bandForm.controls).length > 0) {
  //     Object.keys(bandForm.controls).forEach(key => {
  //       bandForm.get(key).setErrors(null) ;
  //     });
  //   }
  // }



  // resetForm(form: FormGroup) {

  //   form.reset();

  //   Object.keys(form.controls).forEach(key => {
  //     form.get(key).setErrors(null) ;
  //   });
  // }


}

