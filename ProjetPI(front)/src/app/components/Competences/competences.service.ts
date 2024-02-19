import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetencesService {

  private baseUrl = 'http://localhost:3000/competences'; 

  constructor(private http: HttpClient) { }

  // Récupérer toutes les compétences
  getCompetences(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/competences/all`);
  }
    // Récupérer une compétence par son ID
    getCompetenceById(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/competences/get/${id}`);
    }

  // Ajouter une nouvelle compétence
  addCompetence(competence: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/competences/add`, competence);
  }

  // Mettre à jour une compétence (si nécessaire, vous pouvez ajouter une méthode spécifique)
  updateCompetence(id: number, competence: any): Observable<any> {
    // Cette ligne est juste un exemple, adaptez-la selon la structure de votre API si une méthode de mise à jour est nécessaire
    return this.http.put<any>(`${this.baseUrl}/competences/update/${id}`, competence);
  }

  // Supprimer une compétence
  deleteCompetence(id: number,competence: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}Competences/delete/${id}`, { body: competence });
  }
 

}
