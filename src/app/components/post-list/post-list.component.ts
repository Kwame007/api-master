import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post.interface';
import { ApiClientService } from '../../services/api-client.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { PaginatedResponse } from '../../models/params.interface';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  loading = false;
  error: string | null = null;
  
  // Pagination state
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 10;

  constructor(private apiService: ApiClientService, public authService: AuthenticationService) {}

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
        this.posts = response.data;
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
}
