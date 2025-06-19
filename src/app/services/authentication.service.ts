import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzA4MzQ1MTIzLCJleHAiOjE3MDgzNTUxMjN9';

  private testUser = {
    username: 'testuser',
    password: 'testpass',
    token: this.tokenKey
  };

  login(username: string, password: string): boolean {
    // Only allow login for the test user
    if (username === this.testUser.username && password === this.testUser.password) {
      localStorage.setItem(this.tokenKey, this.testUser.token);
      const session = {
        username: this.testUser.username,
        loginTime: new Date().toISOString(),
        token: this.testUser.token
      };
      localStorage.setItem('user-session', JSON.stringify(session));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user-session');
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getSession(): { username: string; loginTime: string; token: string } | null {
    const session = localStorage.getItem('user-session');
    return session ? JSON.parse(session) : null;
  }
} 