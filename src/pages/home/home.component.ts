import {Component, inject, OnInit} from '@angular/core';
import {YoutubeService} from '../../services/youtube.service.component';
import {NgClass, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    SlicePipe,
    FormsModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  public youtubeService = inject(YoutubeService);
  videos: any[] = [];
  filteredVideos: any[] = [];
  searchTerm: string = '';
  playlists: { name: string; videos: any[] }[] = [];
  selectedPlaylistIndex: number | null = null;
  trendingVideos: any[] = [];
  isTrendingActive: boolean = false;
  currentUser: string = '';
  isUsageReportVisible = false;

  filterVideos() {
    this.filteredVideos = this.videos.filter(video =>
      video.snippet.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  createPlaylist(name: string) {
    if (name.trim()) {
      this.playlists.push({name, videos: []});
      this.updatePlaylistsInLocalStorage();
    } else {
      alert('Le nom de la playlist est vide.');
    }
  }

  selectPlaylist(index: number) {
    this.selectedPlaylistIndex = index;
  }

  toggleVideoInPlaylist(video: any) {
    if (this.selectedPlaylistIndex === null) {
      return;
    }

    const selectedPlaylist = this.playlists[this.selectedPlaylistIndex];
    const videoExistsInPlaylist = selectedPlaylist.videos.some(v => v.id === video.id);

    if (videoExistsInPlaylist) {
      selectedPlaylist.videos = selectedPlaylist.videos.filter(v => v.id !== video.id);
    } else {
      selectedPlaylist.videos.push(video);
    }

    // Mettre à jour les playlists dans le localStorage
    this.updatePlaylistsInLocalStorage();
  }

  isVideoInPlaylist(video: any): boolean {
    if (this.selectedPlaylistIndex !== null) {
      // Vérifiez si la vidéo est dans la playlist sélectionnée
      const selectedPlaylist = this.playlists[this.selectedPlaylistIndex];
      return selectedPlaylist.videos.some(v => v.id === video.id); // Changez pour `v.id` si nécessaire
    }
    return false;
  }

  deletePlaylist() {
    if (this.selectedPlaylistIndex !== null) {
      this.playlists.splice(this.selectedPlaylistIndex, 1);
      this.selectedPlaylistIndex = null;
      this.updatePlaylistsInLocalStorage();
    }
  }

  loadPlaylists() {
    const userPlaylists = localStorage.getItem(`playlists_${this.currentUser}`);
    this.playlists = userPlaylists ? JSON.parse(userPlaylists) : [];
  }

  updatePlaylistsInLocalStorage() {
    localStorage.setItem(`playlists_${this.currentUser}`, JSON.stringify(this.playlists));
  }

  isLoggedIn() {
    const storedUser = localStorage.getItem('user');
    return storedUser !== null;
  }

  showTrendingVideos() {
    this.isTrendingActive = true;
    this.filteredVideos = this.trendingVideos;
  }

  showAllVideos() {
    this.isTrendingActive = false;
    this.filteredVideos = this.videos;
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = storedUser;
      this.loadPlaylists();
    }

    this.youtubeService.getVideos().subscribe((data: any) => {
      this.videos = data.items;
      this.filteredVideos = this.videos;
    });

    this.youtubeService.getTrendingVideos().subscribe((data: any) => {
      this.trendingVideos = data.items;
    });
  }
}
