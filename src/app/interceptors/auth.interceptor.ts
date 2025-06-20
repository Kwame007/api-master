import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { tap } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);
  const token = authenticationService.getToken();

  const newReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

  console.log('HTTP Request:', newReq);

  return next(newReq).pipe(
    tap(
      event => console.log('HTTP Response:', event),
      error => console.error('HTTP Error:', error)
    )
  );
};

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authenticationService.getToken();
    const newReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next.handle(newReq).pipe(
      tap(
        event => {},
        error => {}
      )
    );
  }
} 