import {Injectable} from '@angular/core';
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class YoutubeService {
  private API_KEY: string = 'AIzaSyBrJmhlt_aI-R0Sosq97aer0bDGXRr7flg';

  private response = async () =>
    await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=1&key=${this.API_KEY}`
    ).then(res => res.json());

  getVideos() {
    return from(this.response());
  }
}
