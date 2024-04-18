import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Quiz } from 'src/app/models/Quiz';
import { QuizResult } from 'src/app/models/QuizResult';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizUrl = 'http://localhost:8089/ProjetPI'; // Mettez à jour avec l'URL correcte
  private userScores = new Map<number, number>(); // Clé: userID, Valeur: score

  constructor(private http: HttpClient) { }

  getQuizScores(): Observable<{ [userId: number]: number }> {
    // Convertir Map en objet pour la compatibilité avec les réponses JSON
    const scoreObject: { [userId: number]: number } = {};
    this.userScores.forEach((score, userId) => {
      scoreObject[userId] = score;
    });
    return of(scoreObject);
  }
  

  // Définir le score d'un utilisateur
  setUserScore(userId: number, score: number): void {
    this.userScores.set(userId, score);
  }

  // Récupérer le score d'un utilisateur
  getUserScore(userId: number): number {
    return this.userScores.get(userId) || 0; // Retourne 0 si aucun score n'est trouvé
  }

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
      .set('score', score);
    return this.http.post(`${this.quizUrl}/api/quiz/sendCertificate`, params, { responseType: 'text' });
  }
}
