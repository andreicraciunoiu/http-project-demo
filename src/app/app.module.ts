import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { SimpleHttpComponent } from './simple-http/simple-http.component';
import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';
import { youTubeSearchInjectables } from './youtube-search/youtube-search.injectables';
import { SearchBoxComponent } from './youtube-search/search-box/search-box.component';
import { SearchResultComponent } from './youtube-search/search-result/search-result.component';
import { MoreHttpRequestsComponent } from './more-http-requests/more-http-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleHttpComponent,
    SearchBoxComponent,
    SearchResultComponent,
    YoutubeSearchComponent,
    SearchResultComponent,
    SearchBoxComponent,
    MoreHttpRequestsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [youTubeSearchInjectables],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
