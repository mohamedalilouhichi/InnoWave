import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {WebSocketService} from "../message/web-socket.service";

@Injectable({
  providedIn: 'root'
})
export class StageService {
  readonly API_URL = 'http://localhost:8089/ProjetPI';

  constructor(private http: HttpClient,private webSocketService: WebSocketService) {}

  getStage(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/stages/all`);
  }

  getStageByIdEtreprise(idEntreprise: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/stages/${idEntreprise}`);
  }
  addStage(stage: any, idEntreprise: number): Observable<any> {
    stage.idEntreprise = idEntreprise;
    stage.stageAdditionDate = new Date(); // Capture the current date and time

    // Send a POST request to add the stage
    return this.http.post<any>(`${this.API_URL}/stages/add/${idEntreprise}`, stage).pipe(
      tap(() => {
        // If the stage is added successfully, send a notification
        this.webSocketService.sendNotification(idEntreprise, `${stage.title}`, stage.stageAdditionDate.toISOString());
      })
    );
  }



  deleteStage(stage: any): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/stages/delete`, { body: stage });
  }

  updateStage(stage: any): Observable<any> {
    return this.http.put(`${this.API_URL}/stages/update`, stage);
  }




}
