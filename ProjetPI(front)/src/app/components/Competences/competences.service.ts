import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competences } from 'src/app/models/competences';

@Injectable({
  providedIn: 'root'
})
export class CompetencesService {

  private baseUrl = 'http://localhost:8089/ProjetPI/competences'; 

  constructor(private http: HttpClient) { }


  // Récupérer toutes les compétences
  getCompetences(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }
    // Récupérer une compétence par son ID
    getCompetenceById(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/get/${id}`);
    }

    addCompetenceToUser(userId: number, competence: Competences): Observable<Competences> {
      const url = `${this.baseUrl}/addCompetenceToUser/${userId}`;
      return this.http.post<Competences>(url, competence);
    }

  updateCompetence(id: number, competence: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, competence);
}


 // Dans CompetencesService
deleteCompetence(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
}


}
