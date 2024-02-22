import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evaluation } from 'src/app/models/Evaluation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  EvaluationURL = 'http://localhost:8089/ProjetPI/evaluation';

  constructor(private httpClient: HttpClient) {}

  getAllEvaluations(): Observable<Evaluation[]> {
    return this.httpClient.get<Evaluation[]>(`${this.EvaluationURL}/all`);
  }

  getEvaluationById(id: number): Observable<Evaluation> {
    return this.httpClient.get<Evaluation>(`${this.EvaluationURL}/get/${id}`);
  }

  AddEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    return this.httpClient.post<Evaluation>(`${this.EvaluationURL}/add`, evaluation);
  }

  updateEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    return this.httpClient.put<Evaluation>(`${this.EvaluationURL}/update`, evaluation);
  }

  deleteEvaluation(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.EvaluationURL}/delete/${id}`);
  }
}
