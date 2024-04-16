import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Planning } from 'src/app/models/Planning';
import { Observable } from 'rxjs';
import { FavorisPlan } from 'src/app/models/Planning';

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
  
  updatePlanningDates(id: number, newStartDate: Date, newEndDate: Date): Observable<void> {
    const body = {
      newStartDate: newStartDate.toISOString(), // Convertir la date en format ISO
      newEndDate: newEndDate.toISOString() // Convertir la date en format ISO
    };
    return this.httpClient.put<void>(`${this.planningURL}/update/dates/${id}`, body);
  }
  addFavorisPlan(iduser: number,idPlanning:number): Observable<void> {
    return this.httpClient.post<void>(`${this.planningURL}/addfavoris/${idPlanning}/${iduser}`, {});
  }

  getAllFavorisPlans(): Observable<FavorisPlan[]> {
    return this.httpClient.get<FavorisPlan[]>(`${this.planningURL}/allPlan`);
  }

  deleteFavorisPlan(idFavoris: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.planningURL}/deletePlan/${idFavoris}`);
  }
  existeFav(idUser: number, idPlanning: number): Observable<boolean> {
    const url = `${this.planningURL}/existe/${idUser}/${idPlanning}`;
    return this.httpClient.get<boolean>(url);
  }
}
