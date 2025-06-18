import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from '../models/post.interface';
import { catchError, Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor() { }
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
  }
}
