import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.checkTokenValidity().pipe(
      map(isValid => {
        if (isValid) {
          this.authService.refreshUserSession();
          return true;
        } else {
          return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
        }
      }),
      tap(result => {
        if (result === true) {
          console.log('Access granted');
        } else {
          console.log('Access denied, redirecting to login');
        }
      })
    );
  }
}