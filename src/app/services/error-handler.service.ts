import { Injectable } from '@angular/core';
import { Observable, throwError, MonoTypeOperatorFunction } from 'rxjs';
import { retry} from 'rxjs/operators';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handleError<T>(error: any): Observable<T> {
    let errorMessage = '';
    
    if (error instanceof ErrorEvent) {
      errorMessage = error.message;
    } else if (error.status) {
      errorMessage = `Error Code: ${error.status}\nMessage: 'Error fetching posts data'}`;
    } else {
      errorMessage = 'An unexpected error occurred';
    }
    return throwError(() => new Error(errorMessage));
  }

  retryStrategy<T>(retries: number = 3, delayMs: number = 1000): MonoTypeOperatorFunction<T> {
    return retry({ count: retries, delay: delayMs });
  }
} 