import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';
import { Post, Comment } from '../../models/post.interface';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  comments: Comment[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiClientService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'Invalid post ID.';
      this.loading = false;
      return;
    }
    this.fetchPost(id);
    this.fetchComments(id);
  }

  fetchPost(id: number): void {
    this.apiService.GET(id).subscribe({
      next: (post) => {
        this.post = post;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load post.';
        this.loading = false;
      }
    });
  }

  fetchComments(id: number): void {
    this.http.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: () => {
        this.error = 'Failed to load comments.';
      }
    });
  }
} 