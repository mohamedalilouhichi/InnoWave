import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  readonly API_URL = 'http://localhost:8089/ProjetPI';

  constructor(private http: HttpClient) {}

  getStage(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/stages/all`);
  }

  addStage(stage: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/stages/add`, stage);
  }


  deleteStage(stage: any): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/stages/delete`, { body: stage });
  }

  updateStage(stage: any): Observable<any> {
    return this.http.put(`${this.API_URL}/stages/update`, stage);
  }




}
