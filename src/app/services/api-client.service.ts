import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from '../models/post.interface';
import { catchError, Observable, map, switchMap } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { PaginatedResponse, PaginationParams } from '../models/params.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor() { }
  private url = 'https://jsonplaceholder.typicode.com';
  private http = inject(HttpClient);
  private errorHandler = inject(ErrorHandlerService);

  // Get paginated posts
  GET(params?: PaginationParams): Observable<PaginatedResponse<Post>>;
  // Get single post by ID
  GET(id: number): Observable<Post>;
  // Implementation
  GET(paramsOrId?: PaginationParams | number): Observable<PaginatedResponse<Post> | Post> {
    // Check if it's a number (single post request)
    if (typeof paramsOrId === 'number') {
      const id = paramsOrId;
      return this.http.get<Post>(`${this.url}/posts/${id}`).pipe(
        this.errorHandler.retryStrategy(3, 1000),
        catchError(this.errorHandler.handleError<Post>)
      );
    }

    // Handle paginated posts request
    const params = paramsOrId;
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const start = (page - 1) * limit;
    
    const options = {
      params: new HttpParams()
        .set('_start', start.toString())
        .set('_limit', limit.toString())
    };
    
    return this.http.get<Post[]>(`${this.url}/posts`).pipe(
      switchMap(allPosts => {
        const totalItems = allPosts.length;
        return this.http.get<Post[]>(`${this.url}/posts`, options).pipe(
          map(posts => ({
            data: posts,
            pagination: {
              currentPage: page,
              totalItems,
              itemsPerPage: limit,
              totalPages: Math.ceil(totalItems / limit)
            }
          }))
        );
      }),
      this.errorHandler.retryStrategy(3, 1000),
      catchError(this.errorHandler.handleError<PaginatedResponse<Post>>)
    );
  }

  POST(data: Post): Observable<Post> {
    return this.http.post<Post>(`${this.url}/posts`, data)
      .pipe(
        this.errorHandler.retryStrategy(3, 1000),
        catchError(this.errorHandler.handleError<Post>)
      );
  }

  PUT(data: Post): Observable<Post> {
    return this.http.put<Post>(`${this.url}/posts/1`, data)
      .pipe(
        this.errorHandler.retryStrategy(3, 1000),
        catchError(this.errorHandler.handleError<Post>)
      );
  }

  DELETE(id: number): Observable<Post[]> {
    return this.http.delete<Post[]>(`${this.url}/posts/${id}`)
      .pipe(
        this.errorHandler.retryStrategy(3, 1000),
        catchError(this.errorHandler.handleError<Post[]>)
      );
  }
}
