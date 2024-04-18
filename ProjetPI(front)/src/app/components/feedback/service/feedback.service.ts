import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError } from 'rxjs';
import { Feedback, Rating } from '../../../models/feedback';
import { Candidature } from '../../../models/candidature';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  readonly api_url = 'http://localhost:8089/ProjetPI/feedback';
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
    addRating(rating: Rating): Observable<Feedback> {
      return this.http.post<Feedback>(`${this.api_url}/addRating`, rating)
    }

    updateRating(rating: Rating): Observable<Rating> {
      const url = (`${this.api_url}/updateRating `)
      return this.http.put<Rating>(url, rating);
    }




    // --------------------remove rating -------------------
    removeRating(rating: Rating): Observable<void> {
      return this.http.delete<void>(`${this.api_url}/removeRating`, { body: rating })
        .pipe(catchError(this.handleError));
    }


    // --------------------retrieve all ratings -------------------
    retrieveAllRatings(): Observable<Rating[]> {
      return this.http.get<Rating[]>(`${this.api_url}/AllRating`)
        .pipe(catchError(this.handleError));
    }




    //---------Handlererror---------------
    private handleError(error: any): Observable<never> {
      console.error('An error occurred:', error);
      // You can handle errors here, e.g., show a user-friendly message or log the error
      return new Observable<never>();
    }

}

