import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { of, Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthService {
  private readonly AUTH_URL = 'auth';

  isAuthenticated$ = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<void | HttpErrorResponse> {
    return this.http.post(`${this.AUTH_URL}/login`, {
      login,
      password
    }).pipe(
      map((response: any) => {
        localStorage.accessToken = JSON.stringify(response.token);
        this.isAuthenticated$.next(true);
      }),
      catchError((error) => throwError({
        ...error,
        message: error.status === 401 ? 'Incorrect username or password' : error.message
      }))
    );
  }

  logout(): Observable<any> {
    localStorage.removeItem('accessToken');

    this.isAuthenticated$.next(false);

    return of();
  }

  isAuthenticated(): boolean {
    return !!(this.getLocalStorageItem('accessToken'));
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.AUTH_URL}/userInfo`);
  }

  getToken(): string {
    return this.getLocalStorageItem('accessToken');
  }

  private getLocalStorageItem(prop: string) {
    const item = localStorage.getItem(prop);

    return item && JSON.parse(item);
  }
}
