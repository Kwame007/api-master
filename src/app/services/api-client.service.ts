import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from '../models/post.interface';
<<<<<<< dev
import { catchError, Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '../../environments/environment';
=======
import { catchError, Observable, throwError } from 'rxjs';

>>>>>>> main

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor() { }
<<<<<<< dev
  private url = environment.apiUrl;
  private http = inject(HttpClient);
  private errorHandler = inject(ErrorHandlerService);

  GET():Observable<Post[]>{
    return this.http.get<Post[]>(`${this.url}/posts`)
      .pipe(
        this.errorHandler.retryStrategy(3, 1000),
        catchError(this.errorHandler.handleError<Post[]>)
      );
  }

  POST(data:Post):Observable<Post>{
    return this.http.post<Post>(`${this.url}/posts`,data)
      .pipe(
        this.errorHandler.retryStrategy(3, 1000),
        catchError(this.errorHandler.handleError<Post>)
      );
  }

  PUT(data:Post):Observable<Post>{
    return this.http.put<Post>(`${this.url}/posts/1`,data)
      .pipe(
        this.errorHandler.retryStrategy(3, 1000),
        catchError(this.errorHandler.handleError<Post>)
      );
  }

  DELETE(id:number):Observable<Post[]>{
    return this.http.delete<Post[]>(`${this.url}/posts/${id}`)
      .pipe(
        this.errorHandler.retryStrategy(3, 1000),
        catchError(this.errorHandler.handleError<Post[]>)
      );
=======
  private http = inject(HttpClient);

  GET():Observable<Post[]>{
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').pipe(catchError(this.handleError<Post[]>));
  }

  POST(data:Post):Observable<Post>{
    return this.http.post<Post>('https://jsonplaceholder.typicode.com/posts',data).pipe(catchError(this.handleError<Post>));
  }

  PUT(data:Post):Observable<Post>{
    return this.http.put<Post>('https://jsonplaceholder.typicode.com/posts/1',data).pipe(catchError(this.handleError<Post>));
  }

  DELETE(id:number):Observable<Post[]>{
    return this.http.delete<Post[]>(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(catchError(this.handleError<Post[]>));
  }

  private handleError<T>(error: any): Observable<T> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: Error fetching posts data`;
    }
    return throwError(() => new Error(errorMessage));
>>>>>>> main
  }
}
