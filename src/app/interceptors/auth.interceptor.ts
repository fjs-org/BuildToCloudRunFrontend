import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth, idToken } from '@angular/fire/auth';
import { switchMap, take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth); // Inject Firebase Auth

  // 1. Listen for the current ID token
  return idToken(auth).pipe(
    take(1),
    switchMap((token) => {
      // 2. If no token (user logged out), send request as-is
      if (!token) {
        return next(req);
      }

      // 3. Clone the request and add the Authorization header
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next(authReq);
    })
  );
};