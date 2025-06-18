import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from '../models/post.interface';
import { catchError, Observable, map, switchMap, of } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { PaginatedResponse, PaginationParams } from '../models/params.interface';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor() { }
  private url = 'https://jsonplaceholder.typicode.com';
  private http = inject(HttpClient);
  private errorHandler = inject(ErrorHandlerService);
  
  // Cache storage
  private cache = new Map<string, CacheEntry<any>>();
  private cacheDuration = 5 * 60 * 1000; // 5 minutes

  // Get paginated posts
  GET(params?: PaginationParams): Observable<PaginatedResponse<Post>>;
  // Get single post by ID
  GET(id: number): Observable<Post>;
  // Implementation
  GET(paramsOrId?: PaginationParams | number): Observable<PaginatedResponse<Post> | Post> {
    // Check if it's a number (single post request)
    if (typeof paramsOrId === 'number') {
      const id = paramsOrId;
      const cacheKey = `post_${id}`;
      
      // Check cache first
      const cached = this.getFromCache<Post>(cacheKey);
      if (cached) {
        console.log(`📦 Cache HIT for post ${id} - using cached data`);
        return of(cached);
      }
      
      console.log(`🌐 Cache MISS for post ${id} - making API call`);
      // Fetch from API and cache
      return this.http.get<Post>(`${this.url}/posts/${id}`).pipe(
        map(post => {
          console.log(`💾 Caching post ${id}`); 
          this.setCache(cacheKey, post);
          return post;
        }),
        this.errorHandler.retryStrategy(3, 1000),
        catchError(this.errorHandler.handleError<Post>)
      );
    }

    // Handle paginated posts request
    const params = paramsOrId;
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const cacheKey = `posts_page_${page}_limit_${limit}`;
    
    // Check cache first
    const cached = this.getFromCache<PaginatedResponse<Post>>(cacheKey);
    if (cached) {
      console.log(`📦 Cache HIT for posts page ${page} limit ${limit} - using cached data`);
      return of(cached);
    }
    
    console.log(`🌐 Cache MISS for posts page ${page} limit ${limit} - making API call`);
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
          map(posts => {
            const response: PaginatedResponse<Post> = {
              data: posts,
              pagination: {
                currentPage: page,
                totalItems,
                itemsPerPage: limit,
                totalPages: Math.ceil(totalItems / limit)
              }
            };
            console.log(`💾 Caching posts page ${page} limit ${limit}`);
            this.setCache(cacheKey, response);
            return response;
          })
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

  /**
   * Get data from cache if it exists and is not expired
   */
  private getFromCache<T>(key: string): T | null {
    console.log(`🔍 Checking cache for key: ${key}`);
    const entry = this.cache.get(key);
    if (!entry) {
      console.log(`❌ No cache entry found for key: ${key}`);
      return null;
    }
    
    // Check if cache entry has expired
    if (Date.now() > entry.expiresAt) {
      console.log(`⏰ Cache expired for key: ${key}`);
      this.cache.delete(key);
      return null;
    }
    
    console.log(`✅ Cache entry found and valid for key: ${key}`);
    return entry.data as T;
  }

  /**
   * Store data in cache with expiration
   */
  private setCache<T>(key: string, data: T): void {
    const now = Date.now();
    
    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      expiresAt: now + this.cacheDuration
    };
    
    this.cache.set(key, entry);
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    console.log(`🗑️ Clearing cache (${this.cache.size} items)`);
    this.cache.clear();
  }
}
