import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StagebyidService {
  readonly API_URL = 'http://localhost:8089/ProjetPI';

  constructor(private http: HttpClient) {}

  getStageById(idEntreprise: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/stages/${idEntreprise}`);
  }
}
