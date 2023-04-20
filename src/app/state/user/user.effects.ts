import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as AuthActions from './user.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<any>,
    private http: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginLoaded.type),
      switchMap(action => {
        return this.http.login(action.data).pipe(
          tap(user => {
            this.router.navigate(['/home/dashboard']);
            localStorage.setItem('userData', JSON.stringify(user));
          }),
          map(user => AuthActions.loginSuccess({ user })),
          catchError(err => of(AuthActions.loginFailed({ error: err.error })))
        );
      })
    );
  });

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.registerLoaded.type),
      switchMap(action => {
        return this.http.register(action.data).pipe(
          tap(user => {
            this.router.navigate(['/home/dashboard']);
            localStorage.setItem('userData', JSON.stringify(user));
          }),
          map(user => AuthActions.registerSuccess({ user })),
          catchError(err => of(AuthActions.registerFailed({ error: err.error })))
      )})
    );
  });

  // redirectHomePage$ = createEffect(() => {
  //     return this.actions$.pipe(
  //       ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
  //       tap(() => this.router.navigate(['/home/dashboard']))
  //     );
  //   }, { dispatch: false }
  // );

  autoLoadUserData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.autoLoadUser),
      mergeMap(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
          return of(AuthActions.loginSuccess({user: JSON.parse(userData) }));
        } else {
          this.router.navigate(['/auth/login'])
          return of(AuthActions.loginFailed({ error: 'login error' }));
        }
      }),
      catchError(err => of(AuthActions.loginFailed({ error: err.error })))
    );
  });
  
  logout$ = createEffect(():any => {
    return this.actions$.pipe(
      ofType(AuthActions.logoutInitiated),
      tap(() => {
        this.router.navigate(['/auth/login']);
        localStorage.clear();
      }),
      mergeMap(():any => of(AuthActions.logoutSucsess())),
      catchError(err => of(AuthActions.logoutFailed({ error: err.error })))
    );
  })
}
