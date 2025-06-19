import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Post } from '../../models/post.interface';
import { ApiClientService } from '../../services/api-client.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { PaginatedResponse } from '../../models/params.interface';
import { AuthenticationService } from '../../services/authentication.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts$ = new BehaviorSubject<Post[]>([]);
  loading = false;
  error: string | null = null;
  
  // Pagination state
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 10;

  constructor(private apiService: ApiClientService, public authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  login(): void {
    // Use static test user credentials
    this.authService.login('testuser', 'testpass');
  }

  logout(): void {
    this.authService.logout();
  }

  loadPosts(): void {
    this.loading = true;
    this.error = null;

    this.apiService.GET({
      page: this.currentPage,
      limit: this.itemsPerPage
    }).subscribe({
      next: (response: PaginatedResponse<Post>) => {
        this.posts$.next(response.data);
        this.totalItems = response.pagination.totalItems;
        this.currentPage = response.pagination.currentPage;
        this.itemsPerPage = response.pagination.itemsPerPage;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load posts. Please try again.';
        this.loading = false;
        console.error('Error loading posts:', error);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPosts();
  }

  createPost(): void {
    this.router.navigate(['/create']);
  }

  viewPost(postId: number): void {
    this.router.navigate(['/post', postId]);
  }

  editPost(postId: number): void {
    this.router.navigate(['/edit', postId]);
  }

  deletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.apiService.DELETE(postId).subscribe({
        next: () => {
          // Remove the deleted post from the BehaviorSubject
          const updatedPosts = this.posts$.value.filter(post => post.id !== postId);
          this.posts$.next(updatedPosts);
        },
        error: (error) => {
          alert('Failed to delete post.');
          console.error('Delete error:', error);
        }
      });
    }
  }
}
