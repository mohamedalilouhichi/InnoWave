import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: any[] = []; // Ajoutez cette ligne

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.getQuiz();
  }
//wselet hna nbadel fy ts 
  getQuiz(): void {
    this.quizService.getQuizData().subscribe(data => {
      // Supposons que 'data' est la structure que vous attendez, ajustez selon votre API
   //  this.questions = data.domains.flatMap(domain => domain.questions); // Ajustez selon la structure de vos données
      console.log(this.questions);
    }, error => {
      console.error('There was an error!', error);
    });
  }
}
