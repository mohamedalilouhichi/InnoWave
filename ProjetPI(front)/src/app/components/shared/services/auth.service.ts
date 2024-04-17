import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
const apiUrl =  environment.baseApiAuth;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly API_URL = 'http://localhost:8089/ProjetPI';
    constructor(private http: HttpClient , private router: Router)
     {
    }
    authenticate(email: string, password: string): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
  
      const body = { email: email, password: password };
      this.setToken(email);
  
      return this.http.post<any>(`${this.API_URL}/user/login`, body, { headers: headers });
    }
    public getUserbyemail():Observable<any>{
      return this.http.get<any>(`${this.API_URL}/user/retrieve-userbymail/${this.getToken()}`);
    }
  

    loginall(username: string, password: string): Observable<any> {
      return this.http.post<any>(`${this.API_URL}/user/login`, { username, password });
    }

    getUser(): Observable<any[]> {
      return this.http.get<any[]>(`${this.API_URL}/user/all`);
    }

    removeUser(idUser: number): Observable<any> {
      return this.http.delete<any>(`${this.API_URL}/user/delete/${idUser}`, {});
    }

    updateUser(user: any): Observable<any> {
      return this.http.put(`${this.API_URL}/user/update`, user);
    }

    register(signUpData: any): Observable<any> {
      return this.http.post<any>(`${this.API_URL}/user/rh/signup`, signUpData);
    }
    //
    

    setToken(token: string): void {
      localStorage.setItem('token', token);
    }
  
    getToken(): string | null {
      return localStorage.getItem('token');
    }
  
    isLoggedIn() {
      return this.getToken() !== null;
    }
  
    logout() {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    }
  
    //login({ email, password }: any): Observable<any> {
    //  if (email === 'admin@gmail.com' && password === 'admin123') {
     //   this.setToken('abcdefghijklmnopqrstuvwxyz');
     //   return of({ name: 'Tarique Akhtar', email: 'admin@gmail.com' });
     // }
     // return throwError(new Error('Failed to login'));
   // }

}
