import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  private apiUrl = environment.apiUrl;
  constructor(private router: Router, private http: HttpClient) { }

  login(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { userName, password })
  }

  logout(): void {
    // Perform logout logic (e.g., clear session)
    this.isAuthenticated = false;
    // Redirect to the login page after logout
    this.router.navigate(['/login']);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
