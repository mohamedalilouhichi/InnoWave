import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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


  updateCompetence(id: number, competence: Competences): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, competence);
  }

  // Ajouter des compétences à un stage
  addCompetencesToStage(idStage: number, competences: Competences[]): Observable<Competences[]> {
    const url = `${this.baseUrl}/addCompetencesToStage/${idStage}`;
    return this.http.post<Competences[]>(url, competences);
  }

  // Dans CompetencesService
  deleteCompetence(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }

  getCompetencesByUserRole(role: string): Observable<Competences[]> {
    return this.http.get<Competences[]>(`${this.baseUrl}/by-user-role?role=${role}`);
  }
  getCompetencesFiltered(context: 'user' | 'stage', id: number): Observable<Competences[]> {
    let queryParams = new HttpParams();
    if (context === 'user') {
      queryParams = queryParams.append('userId', id.toString());
    } else if (context === 'stage') {
      queryParams = queryParams.append('stageId', id.toString());
    }

    return this.http.get<Competences[]>(`${this.baseUrl}/filter`, { params: queryParams });
  }
//akher haja aamltha hna mazel ma kameltech yjib les competences w yaamelhom fy tag
  getCompetencesByUserId(userId: number): Observable<Competences[]> {
    return this.http.get<Competences[]>(`${this.baseUrl}/getskill/${userId}`);
  }
  getMatchingStudentsForStage(stageId: number): Observable<any[]> {
    const url = `${this.baseUrl}/matchingStudentsForStage`;
    let params = new HttpParams().set('stageId', stageId.toString());

    return this.http.get<any[]>(url, { params: params });
  }
}
