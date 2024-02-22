import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Planning } from 'src/app/models/Planning';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  PlanningURL='http://localhost:8089/ProjetPI/planning'

  constructor(private httpClient:HttpClient) { }
  
  getAllPlannings():Observable<Planning[]>{

    return this.httpClient.get<Planning[]>(this.PlanningURL+'/all')
  }
  getPlanningById(id: number): Observable<Planning> {
    return this.httpClient.get<Planning>(this.PlanningURL+'/get/{id-planning}');
  }
  AddPlanning(planning: Planning): Observable<Planning> {
    return this.httpClient.post<Planning>(this.PlanningURL+'/add', Planning);
  }
  updatePlanning(planning: Planning): Observable<Planning> {
    return this.httpClient.put<Planning>(this.PlanningURL+'/update', Planning);
  }
  deletePlanning(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.PlanningURL+'/delete/${id}');
  }


}
