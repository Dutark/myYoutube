import {Component, inject} from '@angular/core';
import {YoutubeService} from '../../services/youtube.service.component';
import {of} from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public youtubeService = inject(YoutubeService);

  getVideos() {
    return this.youtubeService.getVideos();
  }

  protected readonly of = of;
}
