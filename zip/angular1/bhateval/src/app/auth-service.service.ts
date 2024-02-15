// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  currentUserRole: string | null = null;
  currentUserEmail: string | null = null;

  login(role: string) {
    this.isLoggedIn = true;
    this.currentUserRole = role;
    // Generate a random email for the demo
    this.currentUserEmail = `user${Math.floor(Math.random() * 1000)}@example.com`;
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUserRole = null;
    this.currentUserEmail = null;
  }
}
