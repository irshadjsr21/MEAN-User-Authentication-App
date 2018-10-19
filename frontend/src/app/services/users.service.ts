import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseURL = 'http://localhost:3000/api/auth';
  private noAuthHeader = { headers: new HttpHeaders({'noAuth': 'True'}) };

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    return this.http.post(this.baseURL + '/register', user, this.noAuthHeader);
  }

  loginUser(authDetails) {
    return this.http.post(this.baseURL + '/login', authDetails, this.noAuthHeader);
  }

  getUserDetails() {
    return this.http.get(this.baseURL + '/secret');
  }

  // Helper Functions

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');

  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const payload = atob(token.split('.')[1]);
      return JSON.parse(payload);
    }
    return null;
  }

  isLoggedIn() {
    const payload = this.getUserPayload();

    if (payload) {
      return payload.exp > Date.now() / 1000;
    }

    return false;
  }
}
