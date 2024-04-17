import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  public static getToken(): string {
    return localStorage.getItem(TOKEN)!;
  }

  public static getUser(): any {
    const userString = localStorage.getItem(USER);
    const user = userString ? JSON.parse(userString) : null;
    return user; // Return null if user is not found in localStorage
  }
  

  public static getUserId(): string {
    const user = this.getUser();
    return user ? user.userId : ''; // Return an empty string if user or user.userId is null or undefined
  }

  public static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : ''; // Return an empty string if user is null or user.role is null or undefined
  }
  
  public static isAdminLogged(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const role = this.getUserRole();
    return role === 'ADMIN';
  }

  public static isCustomerLogged(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const role = this.getUserRole();
    return role === 'CUSTOMER';
  }

  public static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
