import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidature } from '../../models/candidature';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  readonly api_url = 'http://localhost:8089';
  httpOptions = { headers:new HttpHeaders({'Content-Type':
  'application/json'})}

  constructor(private http: HttpClient) { }

  getCandidature(): Observable<Candidature[]> {
    return this.http.get<any[]>(`${this.api_url}/retrieveAllCandidatures`);
  }

  addCandidacy(formData:FormData): Observable<Candidature> {
    return this.http.post<Candidature>(`${this.api_url}/addCandidacy`, formData  );
  }

  //addCandidature(candidature: Candidature ): Observable<Candidature> {
  //  return this.http.post<Candidature>(`${this.api_url}/addCandidatureAndAssignToStudentAndStage`, candidature);
  //}

  public updateCandidature(candidature: Candidature):Observable<Candidature>{
    return this.http.put<Candidature>(`${this.api_url}/updateCandidature`,candidature);
  }

  public deleteCandidature(idCandidature: number):Observable<void>{
    return this.http.delete<void>(`${this.api_url}/removeCandidature/${idCandidature}`);
  }
}
