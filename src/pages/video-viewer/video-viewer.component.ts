import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {YoutubeService} from '../../services/youtube.service.component';
import {NgForOf, NgIf} from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-video-viewer',
  templateUrl: './video-viewer.component.html',
  imports: [NgIf, FormsModule, NgForOf],
  styleUrls: ['./video-viewer.component.css']
})
export class VideoViewerComponent implements OnInit {
  public youtubeService = inject(YoutubeService);
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  videoId: string | null = null;
  videoDetails: any;
  safeUrl: SafeResourceUrl | null = null;
  comments: {
    user: string,
    comment: string,
    likes: number,
    dislikes: number,
    replies: { user: string, reply: string }[]
  }[] = [];
  newComment: string = '';
  username: string = '';
  newReply: string = '';
  replyingTo: number | null = null;

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.videoId = params.get('id');
      console.log('Video ID:', this.videoId);
      if (this.videoId) {
        this.getVideoDetails(this.videoId);
        this.loadComments();
      }
    });
  }

  getVideoDetails(videoId: string): void {
    this.youtubeService.getVideoDetails(videoId).subscribe(data => {
      this.videoDetails = data.items[0];
      if (this.videoDetails) {
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${this.videoDetails.id}`
        );
      }
    });
  }

  addComment(): void {
    if (this.newComment.trim() && this.username.trim()) {
      const comment = {user: this.username.trim(), comment: this.newComment.trim(), likes: 0, dislikes: 0, replies: []};
      this.comments.push(comment);
      this.saveComments();
      this.newComment = '';
    }
  }

  addReply(commentIndex: number): void {
    if (this.newReply.trim() && this.username.trim()) {
      const reply = {user: this.username.trim(), reply: this.newReply.trim()};
      this.comments[commentIndex].replies.push(reply);
      this.saveComments();
      this.newReply = '';
      this.replyingTo = null;
    }
  }

  likeComment(commentIndex: number): void {
    this.comments[commentIndex].likes++;
    this.saveComments();
  }

  dislikeComment(commentIndex: number): void {
    this.comments[commentIndex].dislikes++;
    this.saveComments();
  }

  loadComments(): void {
    const savedComments = localStorage.getItem(`comments_${this.videoId}`);
    if (savedComments) {
      this.comments = JSON.parse(savedComments);
    }
  }

  saveComments(): void {
    localStorage.setItem(`comments_${this.videoId}`, JSON.stringify(this.comments));
  }
}
