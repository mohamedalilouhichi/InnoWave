import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/models/Quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizUrl = 'http://localhost:8089/ProjetPI'; // Update with the correct URL
 // GET http://localhost:8089/ProjetPI/api/quiz/unmarshal

  constructor(private http: HttpClient) { }

  getQuizData(domain: string): Observable<Quiz> {
    const params = new HttpParams().set('domain', domain);
    return this.http.get<Quiz>(`${this.quizUrl}/api/quiz/unmarshal`, { params });
  }
  
}
