import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-music-create',
  templateUrl: './music-create.component.html',
  styleUrls: ['./music-create.component.scss']
})
export class MusicCreateComponent implements OnInit {

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
