import { Component, ElementRef, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SearchResult } from '../search-result.model';
import { YoutubeSearchService } from '../youtube-search.service';
import { fromEvent } from 'rxjs'; 
import { map, filter, debounceTime, tap, switchAll } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  template: `
    <input type="text" class="form-control" placeholder="Search" autofocus>
  `
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtube: YoutubeSearchService,
              private el: ElementRef) {
  }

  ngOnInit(): void {
    // convert the `keyup` event into an observable stream
    fromEvent(this.el.nativeElement, 'keyup').pipe(
      map((e: any) => e.target.value), // extract the value of the input
      filter((text: string) => text.length > 1), // filter out if empty
      debounceTime(250),                   // only once every 250ms
      tap(() => this.loading.emit(true)),         // enable loading
      // search, discarding old events if new input comes in
      map((query: string) => this.youtube.search(query)),
      switchAll())
      // act on the return of the search
      .subscribe(
        (results: SearchResult[]) => { // on sucesss
          this.loading.emit(false);
          this.results.emit(results);
        },
        (err: any) => { // on error
          console.log(err);
          this.loading.emit(false);
        },
        () => { // on completion
          this.loading.emit(false);
        }
      );
  }
}
// @Component({
//   selector: 'app-search-box',
//   template: `<input type="text" class="form-control" placeholder="Search" autofocus>`
// })
// export class SearchBoxComponent implements OnInit {

//   @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
//   @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

//   constructor(youtube: YouTubeSearchService, private el: ElementRef) { }

//   ngOnInit(): void {

//     Observable.fromEvent(this.el.nativeElement, 'keyup').map((e: any) => e.target.value).filter((text: string) => text.length > 1).debounceTime(250)
//     .do(() => this.loading.emit(true)).map((query: string) => this.youtube.search(query)).switch()
//     .subscribe((results: SearchResult[]) => {
//         this.loading.emit(false);
//         this.results.emit(results);
//       },
//       (err: any) => {
//         console.log(err);
//         this.loading.emit(false);
//       },
//       () => {
//         this.loading.emit(false);
//       }
//     )
//   }

// }
// const obs = fromEvent(this.el.nativeElement, 'keyup').pipe (map((e:any) => e.target.value), filter((text:string) => text.length > 1),debounceTime(250),
// tap(() => this.loading.emit(true)),map((query:string) => this.youtube.search(query)) ,switchAll()         // act on the return of the search         )  
