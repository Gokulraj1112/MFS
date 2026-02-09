import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'bloomverse_token';
  private readonly USER_KEY = 'bloomverse_user';
  private readonly baseUrl = 'https://mfs-backend.netlify.app/';

  private userSignal = signal<User | null>(this.getUserFromStorage());
  private isLoadingSignal = signal<boolean>(false);

  // ✅ signals
  readonly user = this.userSignal.asReadonly();
  readonly isLoading = this.isLoadingSignal.asReadonly();
  readonly isAuthenticated = () => this.userSignal() !== null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /* ================= LOGIN ================= */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    this.isLoadingSignal.set(true);

    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        this.storeAuthData(response.token, response.user);
        this.userSignal.set(response.user);
      }),
      catchError(error => {
        this.isLoadingSignal.set(false);
        return throwError(() => error);
      }),
      tap(() => this.isLoadingSignal.set(false))
    );
  }

  /* ================= REGISTER ================= */
  register(userData: RegisterRequest): Observable<AuthResponse> {
    this.isLoadingSignal.set(true);

    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, userData).pipe(
      tap(response => {
        this.storeAuthData(response.token, response.user);
        this.userSignal.set(response.user);
      }),
      catchError(error => {
        this.isLoadingSignal.set(false);
        return throwError(() => error);
      }),
      tap(() => this.isLoadingSignal.set(false))
    );
  }

  /* ================= LOGOUT ================= */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.userSignal.set(null);
    this.router.navigate(['/']);
  }

  /* ================= TOKEN ================= */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /* ================= USER ================= */
  getUser(): User | null {
    return this.userSignal();
  }

  getUserId(): number | null {
    const user = this.userSignal();
    return user?.id ?? null;
  }

  /* ================= STORAGE ================= */
  private storeAuthData(token: string, user: User): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    const token = localStorage.getItem(this.TOKEN_KEY);

    if (userJson && token) {
      try {
        return JSON.parse(userJson);
      } catch {
        return null;
      }
    }
    return null;
  }
}
