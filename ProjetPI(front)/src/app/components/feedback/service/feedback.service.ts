import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Feedback } from '../../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  readonly api_url = 'http://localhost:8089';
  httpOptions = { headers:new HttpHeaders({ 'Content-Type':
'application/json'})}

  constructor(private http: HttpClient) { }

  getFeedback(): Observable<Feedback[]> {
    return this.http.get<any[]>(`${this.api_url}/retrieveAllFeedbacks`);
  }

  addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.api_url}/addFeedback`, feedback  );
  }

  

  public updateFeedback(feedback: Feedback):Observable<Feedback>{
    return this.http.put<Feedback>(`${this.api_url}/updateFeedback`,feedback);
  }

  public deleteFeedback(idFeedback: number):Observable<void>{
    return this.http.delete<void>(`${this.api_url}/removeFeedback/${idFeedback}`);
  }

}
