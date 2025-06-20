import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiClientService } from './api-client.service';
import { Post } from '../models/post.interface';
import { PaginatedResponse } from '../models/params.interface';


describe('ApiClientService', () => {
  let service: ApiClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a post by id', () => {
    const mockPost: Post = { id: 1, title: 'Test', body: 'Body', userId: 1 };
    service.GET(1).subscribe(post => {
      expect(post).toEqual(mockPost);
    });
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  it('should fetch paginated posts', () => {
    const mockPosts: Post[] = [
      { id: 1, title: 'Test1', body: 'Body1', userId: 1 },
      { id: 2, title: 'Test2', body: 'Body2', userId: 2 }
    ];
    // The first call gets all posts for totalItems
    // The second call gets paginated posts
    service.GET({ page: 1, limit: 2 }).subscribe((response: PaginatedResponse<Post>) => {
      expect(response.data.length).toBe(2);
      expect(response.pagination.currentPage).toBe(1);
      expect(response.pagination.itemsPerPage).toBe(2);
    });
    httpMock.expectOne('https://jsonplaceholder.typicode.com/posts').flush(mockPosts);
    httpMock.expectOne(req => req.url === 'https://jsonplaceholder.typicode.com/posts').flush(mockPosts);
  });

  it('should create a post', () => {
    const newPost: Post = { id: 101, title: 'New', body: 'New body', userId: 1 };
    service.POST(newPost).subscribe(post => {
      expect(post).toEqual(newPost);
    });
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toBe('POST');
    req.flush(newPost);
  });

  it('should update a post', () => {
    const updatedPost: Post = { id: 1, title: 'Updated', body: 'Updated body', userId: 1 };
    service.PUT(updatedPost).subscribe(post => {
      expect(post).toEqual(updatedPost);
    });
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPost);
  });

  it('should delete a post', () => {
    const deletedPosts: Post[] = [];
    service.DELETE(1).subscribe(posts => {
      expect(posts).toEqual(deletedPosts);
    });
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(deletedPosts);
  });
});
