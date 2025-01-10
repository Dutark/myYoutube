import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class YoutubeService {
  private readonly API_KEY: string = 'AIzaSyBrJmhlt_aI-R0Sosq97aer0bDGXRr7flg';
  private readonly search: string = '';

  private readonly response: Observable<any> = from(
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=500&regionCode=FR&key=${this.API_KEY}${this.search ? `&q=${(this.search)}` : ""}`
    ).then(res => res.json())
  );

  getVideos() {
    return this.response;
  }

  getVideoDetails(videoId: string): Observable<any> {
    return from(
      fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${this.API_KEY}`
      ).then((res) => res.json())
    );
  }

  getTrendingVideos(): Observable<any> {
    return from(
      fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&regionCode=FR&key=${this.API_KEY}`
      ).then((res) => res.json())
    );
  }
}
