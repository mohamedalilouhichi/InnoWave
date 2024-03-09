import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Feedback, Rating } from '../../models/feedback';
import { Candidature } from '../../models/candidature';

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

  addFeedback(formData: FormData): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.api_url}/addFeedback`, formData  );
  }

  

  public updateFeedback(feedback: Feedback):Observable<Feedback>{
    return this.http.put<Feedback>(`${this.api_url}/updateFeedback`,feedback);
  }

  public removeFeedback(idFeedback: number):Observable<void>{
    return this.http.delete<void>(`${this.api_url}/removeFeedback/${idFeedback}`);
  }


  public addFeedbackAndAssignToStudentAndEntreprise(feedback : Feedback, user:string, entreprise:string):Observable<Feedback[]>{
    return this.http.post<Feedback[]>(`${this.api_url}/addFeedbackAndAssignToStudentAndEntreprise/`+user+`/`+entreprise ,feedback);
  
  }

  //--------------------add rating -------------------
 addRating(rating:Rating):Observable<Candidature>{
  return  this.http.post<Candidature>(`${this.api_url}/addRating`,rating)

}

}
