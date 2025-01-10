  import { Component, OnInit } from '@angular/core';
  import {YoutubeService} from '../../services/youtube.service.component';

  @Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
  })
  export class UserComponent implements OnInit {
    user: { username: string; email: string; registerDate: string } | null = null;
    analyticsData: any;

    private readonly API_KEY_ANALYTICS: string = 'AIzaSyDgRRbLwfaoMCXKiPr-BSpxEQPeoSdIK0Q'

    getAnalyticsData() {
      const channelId = this.user?.username; // Par exemple, l'ID de la chaîne pourrait être stocké dans le `username`.
      fetch(
        `https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==${channelId}&startDate=2024-01-01&endDate=2024-01-10&metrics=views,likes,dislikes,subscribersGained,subscribersLost&key=${this.API_KEY_ANALYTICS}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.analyticsData = data;
        })
        .catch((error) => {
          console.error('Error fetching analytics data:', error);
        });
    }

    ngOnInit(): void {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      } else {
        alert('Vous devez être connecté pour accéder à cette page.');
        window.location.href = '/login';
      }
    }

    logout(): void {
      localStorage.removeItem('user');
      alert('Vous avez été déconnecté.');
      window.location.href = '/login';
    }
  }
