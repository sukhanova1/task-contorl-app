import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, Observable } from 'rxjs';
import { getAccessToken } from '../state/user/user.selector';

@Injectable({
  providedIn: 'root',
})

export class TokenInterceptorService implements HttpInterceptor {
  constructor(private store$: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store$.select(getAccessToken).pipe(
      exhaustMap((token) => {
        let jwt = req.clone({
          setHeaders: {
            Authorization: `bearer ${token}`,
            'content-type': 'application/json',
          },
        });
        
        return next.handle(jwt);
      })
    );    
  }
}
