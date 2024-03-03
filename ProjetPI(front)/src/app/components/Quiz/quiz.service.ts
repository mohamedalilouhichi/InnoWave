import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/models/Quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizUrl = 'http://localhost:8089/ProjetPI'; // Update with the correct URL

  constructor(private http: HttpClient) { }

  getQuizData(): Observable<Quiz> {
 
    return this.http.get<Quiz>(`${this.quizUrl}/api/quiz/unmarshal`);
  }
  
}
