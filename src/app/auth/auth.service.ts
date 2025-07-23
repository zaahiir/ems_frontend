import { Injectable, NgZone  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of, timer } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';


interface User {
  id: string;
  name: string;
  email: string;
  user_type: string;
  user_type_name: string;
}

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  // private apiUrl = 'https://backend.faiop.com/apis';
  private apiUrl = 'http://localhost/apis';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private tokenExpirationTimer: any;
  private inactivityTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.initAutoLogout();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, { username, password }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map(user => {
        if (user && user.access && user.refresh) {
          this.storeUserData(user);
          this.startTokenExpirationTimer();
        }
        return user;
      })
    );
  }

  clientLogin(panNo: string, dob: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, { username: panNo, dob }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map(response => {
        if (response && response.access && response.refresh) {
          this.storeUserData(response);
        }
        return response;
      })
    );
  }

  getUserRole(): string {
    const userType = localStorage.getItem('user_type');
    const employeeUserType = localStorage.getItem('employee_user_type');

    if (userType === 'superuser') return 'superuser';
    if (userType === 'employee') {
      return employeeUserType === 'Admin' ? 'admin' : 'staff';
    }
    if (userType === 'client') return 'client';
    return 'guest';
  }

  public getCurrentUser(): any {
    return {
      id: localStorage.getItem('user_id'),
      name: localStorage.getItem('user_name'),
      email: localStorage.getItem('user_email'),
      user_type: localStorage.getItem('user_type'),
      user_type_name: localStorage.getItem('user_type_name')
    };
  }

  getUserProfile(): Observable<User> {
    const userType = localStorage.getItem('user_type');
    const userId = localStorage.getItem('user_id');

    if (userType === 'employee' && userId) {
      return this.getEmployeeProfile(userId);
    } else if (userType === 'client') {
      return this.getClientProfile();
    } else if (userType === 'superuser') {
      return this.getSuperuserProfile();
    } else {
      return throwError(() => new Error('Unknown user type'));
    }
  }

  private getSuperuserProfile(): Observable<User> {
    const superuserData: User = {
      id: localStorage.getItem('user_id') || '',
      name: localStorage.getItem('user_name') || localStorage.getItem('username') || '',
      email: localStorage.getItem('user_email') || '',
      user_type: 'superuser',
      user_type_name: 'Superuser'
    };
    return of(superuserData);
  }

  private getEmployeeProfile(userId: string): Observable<User> {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      return throwError(() => new Error('No access token found'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get<User>(`${this.apiUrl}/employee/${userId}/`, { headers }).pipe(
      tap((profile: User) => {
        const updatedUser = { ...this.currentUserValue, ...profile };
        this.handleAuthentication(updatedUser);
      }),
      catchError(this.handleError)
    );
  }

  private getClientProfile(): Observable<User> {
    // For clients, we'll return the data from local storage
    const clientData: User = {
      id: localStorage.getItem('user_id') || '',
      name: localStorage.getItem('user_name') || '',
      email: localStorage.getItem('user_email') || '',
      user_type: 'client',
      user_type_name: 'Client'
    };
    return of(clientData);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error && typeof error.error === 'object' && 'detail' in error.error) {
      errorMessage = error.error.detail;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private handleAuthentication(user: User): void {
    // Update the current user and store in localStorage
    this.updateCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): Observable<void> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<void>(`${this.apiUrl}/logout/`, { refresh_token: refreshToken }).pipe(
      map(() => {
        this.clearUserData();
        this.stopTokenExpirationTimer();
        this.stopInactivityTimer();
      }),
      catchError((error) => {
        console.error('Logout error:', error);
        this.clearUserData();
        this.stopTokenExpirationTimer();
        this.stopInactivityTimer();
        return throwError(() => error);
      })
    );
  }

  public get isAuthenticated(): boolean {
    return !!this.currentUserValue && !!localStorage.getItem('access_token');
  }

  private storeUserData(response: any): void {
    localStorage.setItem('currentUser', JSON.stringify(response));
    localStorage.setItem('access_token', response.access);
    localStorage.setItem('refresh_token', response.refresh);
    localStorage.setItem('user_type', response.user_type);
    localStorage.setItem('user_id', response.user_id);
    localStorage.setItem('user_name', response.name || response.username);
    localStorage.setItem('user_email', response.email);
    localStorage.setItem('user_type_name', response.user_type_name);
    this.updateCurrentUser(response);
  }

  private clearUserData(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_type_name');
    this.updateCurrentUser(null);
  }

  public updateCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  private initAutoLogout(): void {
    if (this.isAuthenticated) {
      this.startTokenExpirationTimer();
      this.startInactivityTimer();
    }
  }

  private startTokenExpirationTimer(): void {
    this.stopTokenExpirationTimer();
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = this.decodeJwt(token);
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;

      if (timeUntilExpiration > 0) {
        this.tokenExpirationTimer = timer(timeUntilExpiration).pipe(
          switchMap(() => this.refreshToken())
        ).subscribe({
          next: (success) => {
            if (success) {
              console.log('Token refreshed successfully');
              this.startTokenExpirationTimer(); // Restart timer with new token
            } else {
              console.error('Failed to refresh token');
              this.autoLogout();
            }
          },
          error: () => {
            console.error('Error in token refresh process');
            this.autoLogout();
          }
        });
      } else {
        this.autoLogout();
      }
    }
  }

  private stopTokenExpirationTimer(): void {
    if (this.tokenExpirationTimer) {
      this.tokenExpirationTimer.unsubscribe();
    }
  }

  private startInactivityTimer(): void {
    this.stopInactivityTimer();
    this.inactivityTimer = timer(30 * 60 * 1000).subscribe(() => { // 30 minutes
      this.autoLogout();
    });
  }

  private stopInactivityTimer(): void {
    if (this.inactivityTimer) {
      this.inactivityTimer.unsubscribe();
    }
  }

  private resetInactivityTimer(): void {
    this.startInactivityTimer();
  }

  private autoLogout(): void {
    this.ngZone.run(() => {
      this.clearUserData();
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url }
      });
    });
  }

  public refreshToken(): Observable<boolean> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return of(false);
    }

    return this.http.post<any>(`${this.apiUrl}/token/refresh/`, { refresh: refreshToken }).pipe(
      map(response => {
        if (response && response.access) {
          localStorage.setItem('access_token', response.access);
          if (response.refresh) {
            localStorage.setItem('refresh_token', response.refresh);
          }
          this.startTokenExpirationTimer();
          this.resetInactivityTimer();
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Error refreshing token:', error);
        this.autoLogout();
        return of(false);
      })
    );
  }

  public checkTokenValidity(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return of(false);
    }

    const decodedToken = this.decodeJwt(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      return this.refreshToken();
    }

    return of(true);
  }

  private decodeJwt(token: string): DecodedToken {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  public refreshUserSession(): void {
    if (this.isAuthenticated) {
      this.resetInactivityTimer();
    }
  }
}
