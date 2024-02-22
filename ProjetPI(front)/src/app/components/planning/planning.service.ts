import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Planning } from 'src/app/models/Planning';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  planningURL = 'http://localhost:8089/ProjetPI/planning';

  constructor(private httpClient: HttpClient) { }
  
  getAllPlannings(): Observable<Planning[]> {
    return this.httpClient.get<Planning[]>(`${this.planningURL}/all`);
  }

  getPlanningById(id: number): Observable<Planning> {
    return this.httpClient.get<Planning>(`${this.planningURL}/get/${id}`);
  }

  addPlanning(planning: Planning): Observable<Planning> {
    return this.httpClient.post<Planning>(`${this.planningURL}/add`, planning);
  }

  updatePlanning(planning: Planning): Observable<Planning> {
    return this.httpClient.put<Planning>(`${this.planningURL}/update`, planning);
  }

  deletePlanning(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.planningURL}/delete/${id}`);
  }
}
