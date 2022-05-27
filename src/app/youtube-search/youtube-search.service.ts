import { Injectable, Inject } from '@angular/core';
import {
  HttpClient,

} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchResult } from './search-result.model';
import 'rxjs/Rx';

export const YOUTUBE_API_KEY =
  'AIzaSyA-Yv-S3kbxOwdi2lGMfCdZlwSDmSQlR94';
export const YOUTUBE_API_URL =
  'https://www.googleapis.com/youtube/v3/search';

@Injectable()
export class YoutubeSearchService {
  constructor(
    private http: HttpClient,
    @Inject(YOUTUBE_API_KEY) private apiKey: string,
    @Inject(YOUTUBE_API_URL) private apiUrl: string
  ) {}

  search(query: string): Observable<SearchResult[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');
    const queryUrl = `${this.apiUrl}?${params}`;
    return this.http.get(queryUrl).pipe(
        // pentru eroarea Property 'map' does not exist on type 'Observable<Object>'.ts(2339), folosesti .pipe(si aici pui map-ul cu ce are in el)
    map((response: any)=> {
      return <any>response['items'].map((item: any) => {
        console.log("raw item", item); // uncomment if you want to debug
        return new SearchResult({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url
        });
      });
    }));
  }
}


// @Injectable()
// export class YoutubeSearchService{
    
// export const YOUTUBE_API_KEY =
//   'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
// export const YOUTUBE_API_URL =
//   'https://www.googleapis.com/youtube/v3/search';

//     constructor(
//         private http: HttpClient,
//         @Inject(YOUTUBE_API_KEY)private apiKey: string,
//         @Inject(YOUTUBE_API_URL)private apiUrl: string
//     ){}

//     search(query: string): Observable<SearchResult[]>{
//         const params: string = [
//             `q=${query}`,
//             `key=${this.apiKey}`,
//             `par=snippet`,
//             `type=video`,
//             `maxResults=10`
//         ].join('&');
//         const queryUrl = `${this.apiUrl}?${params}`;
//         return this.http.get(queryUrl).map(response => {
//             return <any>response['items'].map(item => {
//                 return new SearchResult({
//                     id: item.id.videoId,
//                     title: item.snippet.titlem,
//                     description: item.snippet.description,
//                     thumbnailUrl: item.snippet.thumbnails.high.url
//                 });
//             });
//         });
//     }
// }