import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { QuizQuestion } from 'src/app/models/QuizQuestion'; // Ensure this path matches your project structure

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  currentQuestionIndex: number = 0;
  questions: QuizQuestion[] = [];
  correctCount: number = 0;
  streakCount: number = 0;
  responseTimes: number[] = [];
  quizStarted: boolean = false;
  quizFinished: boolean = false;
  startTime?: number;
  domain: string = ''; // Added for model-driven form

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    // Initial setup if needed, but avoid fetching quiz data here
  }

  get currentQuestionText(): string | null {
    return this.questions[this.currentQuestionIndex]?.text || null;
  }

  getQuiz(domain: string): void {
    if (!domain) {
      // Optionally, handle the case where the domain is not provided
      console.error('Domain is required to start the quiz.');
      return;
    }

    this.quizService.getQuizData(domain).subscribe(
      data => {
        this.questions = data.domains.flatMap(domain => domain.questions);
        this.initializeQuiz();
      },
      error => {
        console.error('There was an error fetching the quiz data:', error);
        // Handle this error in a user-friendly way
      }
    );
  }

  initializeQuiz(): void {
    this.quizStarted = true;
    this.quizFinished = false;
    this.currentQuestionIndex = 0;
    this.correctCount = 0;
    this.streakCount = 0;
    this.responseTimes = [];
    this.startTime = new Date().getTime();
  }

  selectAnswer(option: string, question: QuizQuestion): void {
    const endTime = new Date().getTime();
    const responseTime = (endTime - (this.startTime ?? endTime)) / 1000;
    this.responseTimes.push(responseTime);

    if (option === question.answer) {
      this.correctCount++;
      this.streakCount++;
    } else {
      this.streakCount = 0;
    }

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.startTime = new Date().getTime();
    } else {
      this.quizFinished = true;
    }
  }

  playAgain(): void {
    this.getQuiz(this.domain); // Use the domain property directly
  }

  getAverageResponseTime(): string {
    if (this.responseTimes.length === 0) return '0';
    const sum = this.responseTimes.reduce((a, b) => a + b, 0);
    const avg = sum / this.responseTimes.length;
    return avg.toFixed(2);
  }
}
