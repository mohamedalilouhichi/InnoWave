import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/models/Quiz';
import { QuizResult } from 'src/app/models/QuizResult';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizUrl = 'http://localhost:8089/ProjetPI'; // Mettez à jour avec l'URL correcte

  constructor(private http: HttpClient) { }

  getQuizData(domain: string): Observable<Quiz> {
    const params = new HttpParams().set('domain', domain);
    return this.http.get<Quiz>(`${this.quizUrl}/api/quiz/unmarshal`, { params });
  }

  submitQuizResults(quizResult: QuizResult): Observable<any> {
    return this.http.post(`${this.quizUrl}/api/quiz/submit`, quizResult);
  }

  sendCertificate(email: string, name: string, score: number): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('name', name)
      .set('score', 20);
  //haw wen mazelet 3endi lmochkla score mawjouda int fel back w hna taamel fel mochkla lazem nrodha double w aandy ykharejli error meme hatta ki ma naatyh lmail wel esem
    return this.http.post(`${this.quizUrl}/api/quiz/sendCertificate`, params, { responseType: 'text' });
  }
  
  
  
}
