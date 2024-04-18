import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competences } from 'src/app/models/competences';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class CompetencesService {

  private baseUrl = 'http://localhost:8089/ProjetPI'; 

  constructor(private http: HttpClient) { }


  // Récupérer toutes les compétences
  getCompetences(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/competences/all`);
  }
    // Récupérer une compétence par son ID
    getCompetenceById(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/competences/get/${id}`);
    }

    addCompetence(targetType: 'user' | 'stage', targetId: number, competence: Competences): Observable<Competences | Competences[]> {
      let url = '';
      if (targetType === 'user') {
        url = `${this.baseUrl}/competences/addCompetenceToUser/${targetId}`;
        return this.http.post<Competences>(url, competence);
      } else if (targetType === 'stage') {
        url = `${this.baseUrl}/competences/addCompetencesToStage/${targetId}`;
        // Assuming array to match existing method, adjust if backend expects single object
        return this.http.post<Competences[]>(url, [competence]);
      } else {
        throw new Error('Invalid target type for adding competences');
      }
    }

    updateCompetence(id: number, competence: Competences): Observable<any> {
      return this.http.put(`${this.baseUrl}/competences/update/${id}`, competence);
    }
    
  // Dans CompetencesService

// Récupérer les compétences par l'ID de l'utilisateur



 // Dans CompetencesService
deleteCompetence(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/competences/delete/${id}`);
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

  return this.http.get<Competences[]>(`${this.baseUrl}/competences/filter`, { params: queryParams });
}
//akher haja aamltha hna mazel ma kameltech yjib les competences w yaamelhom fy tag 
getCompetencesByUserId(userId: number): Observable<Competences[]> {
  return this.http.get<Competences[]>(`${this.baseUrl}/competences/getskill/${userId}`);
}
getMatchingStudentsForStage(stageId: number): Observable<any[]> {
  const url = `${this.baseUrl}/matchingStudentsForStage`;
  let params = new HttpParams().set('stageId', stageId.toString());

  return this.http.get<any[]>(url, { params: params });
}
getAllUsersWithCompetences(): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl}/user/all-with-competences`);
}
}
