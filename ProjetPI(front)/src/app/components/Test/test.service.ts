import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private baseUrl = 'http://localhost:8089/ProjetPI/Test'; 
  constructor(private http: HttpClient) { }
   // Récupérer toutes les compétences
   getTest(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }
    // Récupérer une compétence par son ID
    getTestById(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/get/${id}`);
    }

  // Ajouter une nouvelle compétence
  addTest(test: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, test);
  }

  updateTest(id: number, test: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, test);
}


 // Dans CompetencesService
deleteCompetence(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
}
}
