import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { QuizQuestion } from 'src/app/models/QuizQuestion'; // Adjust the import path as necessary

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  currentQuestionIndex: number = 0;
  questions: QuizQuestion[] = []; // Use QuizQuestion model for type safety
  correctCount: number = 0;
  streakCount: number = 0;
  responseTimes: number[] = [];
  quizStarted: boolean = false;
  quizFinished: boolean = false;
  startTime?: number;


  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.getQuiz();
  }
  get currentQuestionText(): string | null {
    return this.questions[this.currentQuestionIndex]?.text || null;
  }
  
  getQuiz(): void {
    this.quizService.getQuizData().subscribe(data => {
      // Adjust this according to the actual structure of your API response.
      // The following assumes `data` directly contains an array of domains.
      // You might need to adjust the path to match your API response structure.
      this.questions = data.domains.flatMap(domain => domain.questions);
      this.quizStarted = true;
      this.quizFinished = false;
      this.currentQuestionIndex = 0;
      this.correctCount = 0;
      this.streakCount = 0;
      this.responseTimes = [];
      this.startTime = new Date().getTime(); // Initialize start time for the first question
      console.log(this.questions);
    }, error => {
      console.error('There was an error!', error);
    });
  }

  selectAnswer(option: string, question: QuizQuestion): void {
    const endTime = new Date().getTime();
    // Use the nullish coalescing operator to provide a fallback value for startTime
    // Assuming a fallback of 0 is sensible; adjust as necessary for your logic
    const responseTime = (endTime - (this.startTime ?? endTime)) / 1000;
    this.responseTimes.push(responseTime);
  
    if (option === question.answer) {
      this.correctCount++;
      this.streakCount++;
    } else {
      this.streakCount = 0;
    }
  
    // Move to the next question or finish the quiz
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.startTime = new Date().getTime(); // Reset start time for the next question
    } else {
      this.quizFinished = true;
    }
  }
  

  playAgain(): void {
    this.getQuiz(); // Reload the quiz
  }
  getAverageResponseTime(): string {
    if (this.responseTimes.length === 0) return '0';
    const sum = this.responseTimes.reduce((a, b) => a + b, 0);
    const avg = sum / this.responseTimes.length;
    return avg.toFixed(2); // Returns a string with 2 decimal places
  }
  
}
