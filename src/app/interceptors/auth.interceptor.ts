import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { tap } from 'rxjs/operators';

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