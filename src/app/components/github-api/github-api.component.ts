import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, from, fromEvent, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, mergeMap, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

interface Data {
  data: 'string'
}



@Component({
  selector: 'app-github-api',
  templateUrl: './github-api.component.html',
  styleUrls: ['./github-api.component.scss']
})
export class GithubApiComponent implements OnInit {

  searchTerms = new Subject<string>()

  



  // https://api.github.com/users/?q=nolimitmaks

  // https://api.github.com/users/username/repos


  // URL: string = 'https://api.github.com/users/?q='

  URL: string = 'https://api.github.com/users/'

  repos: any[] = []

  constructor() { }

  ngOnInit(): void {




    this.searchTerms.pipe(
      
      debounceTime(5000),
      distinctUntilChanged(),

      switchMap(


        e => {
          // console.log(e);

          let v: string = ''
          const myRegEx  = /[^a-z\d]/i
          
          if(e.length > 0) {

            v = e.split('').filter(
              // s => s !== ' '

              s => !(myRegEx.test(s))

            ).join('')

          }

          // console.log(v);
          
       
          if(v) {
            return from(
              fetch(
                `${this.URL}${v}/repos`
                // `${v}/repos`
              )
              .then(response => response.json())
              // .then(data => console.log(data))
            ).pipe(
              catchError(err => EMPTY)
            )
          } else return of([])




          
                // need way to playarround with its cors
          // GET http://localhost:8077/nolimitmaks/repos 404 (Not Found)
          // return ajax.getJSON(`${v}/repos`)
          
        }
  
      ),

      // can create different subscribtion for every object in array
      // mergeMap(
      //   item => item
      // )
      

    ).subscribe(
      data => this.repos = data
      
      // { 
        
        // const html = ``
        // const result = document.getElementById('result')

        // result?.insertAdjacentElement('beforeend', html)
      // }
    )
    


  
  }


  // inputSearch(term: string): void {
  //   this.searchTerms.next(term)
  // }

  // inputSearch(e: any) {
  //   // this.searchTerms.next(e.key)
  //   this.searchTerms.next(e.target.value)

  // }

  // inputSearch(key: string) {
  //   this.searchTerms.next(key)
  // }





  inputSearch(e: Event) {

    const target = e.target as HTMLInputElement

    this.searchTerms.next(target.value)
  }

}
