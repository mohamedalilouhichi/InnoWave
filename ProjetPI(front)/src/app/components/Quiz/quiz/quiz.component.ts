import {  Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { QuizService } from '../quiz.service';
import { QuizQuestion } from 'src/app/models/QuizQuestion'; // Ensure this path matches your project structure
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  currentQuestionIndex: number = 0;
  questions: QuizQuestion[] = [];
  correctCount: number = 0;
  streakCount: number = 0;
  responseTimes: number[] = [];
  quizStarted: boolean = false;
  quizFinished: boolean = false;
  startTime?: number;
  domain: string = ''; // Added for model-driven form
  attempts: number = 0;
  timer: any; // For storing the timer reference
  timeLeft: number=0; // Time left for the quiz in seconds
  totalTime: number = 1 * 60; 
  constructor(private quizService: QuizService, private cdr: ChangeDetectorRef) { }
  
  ngOnDestroy(): void {
    // Clear the timer if the component is destroyed to prevent memory leaks
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

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
    this.timeLeft = this.totalTime;
    this.startTimer();
  }
  startTimer(): void {
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.timer = null; // Ensure the timer is marked as cleared
        
        if (!this.quizFinished) { // Check if the quiz isn't already finished
          this.quizFinished = true; // Mark the quiz as finished
          // SweetAlert2 modal to notify the user that time is up
          Swal.fire({
            icon: 'info',
            title: 'Time\'s Up!',
            text: 'Your time is over.',
            confirmButtonText: 'View Results'
          }).then((result) => {
            if (result.value) {
              this.submitQuiz(); // Proceed to submit the quiz and show results
            }
          });
        }
      }
      this.cdr.detectChanges(); // Ensure the timer updates are reflected in the view
    }, 1000);
  }
  
  
  
  selectAnswer(option: string, question: QuizQuestion): void {
    const endTime = new Date().getTime();
    const responseTime = (endTime - (this.startTime ?? endTime)) / 1000;
    this.responseTimes.push(responseTime);
  
    let isAnswerCorrect = false; // Temporarily store if the answer is correct
  
    // Reset the selected state for all choices and mark the selected one
    question.choices.forEach(choice => {
      choice.selected = (choice.value === option); // Simplify the assignment
      if (choice.selected) {
        isAnswerCorrect = (choice.value === question.answer);
        choice.isCorrect = isAnswerCorrect; // You could also move this logic elsewhere if you want to determine correctness outside of user selection
      }
    });
  
    // Update the quiz stats based on whether the answer was correct
    if (isAnswerCorrect) {
      this.correctCount++;
      this.streakCount++;
    } else {
      this.streakCount = 0;
    }
  
    // Advance to the next question or finish the quiz
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.quizFinished = true;
    }
  
    this.startTime = new Date().getTime(); // Reset startTime for the next question
  
    this.cdr.detectChanges(); // Manually trigger change detection to ensure UI updates
  }
  

  playAgain(): void {
    if (this.attempts < 1) { // Allow one retake
      this.attempts++;
      this.initializeQuiz(); // Re-initialize the quiz to start over
      this.getQuiz(this.domain); // Fetch new quiz data based on the domain
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Maximum limit of attempts exceeded!',
      });
    }
  }
  
  submitQuiz(): void {
    clearInterval(this.timer);
  this.timer = null; // Ensure the timer is marked as cleared
  this.quizFinished = true; 
    const totalQuestions = this.questions.length;
    const correctRate = ((this.correctCount / totalQuestions) * 100).toFixed(2);
    let message = '';
    if (this.correctCount >= 7) { // Assuming 7 correct answers is the passing criteria
      message = 'Congratulations! You passed the test.';
    } else {
      message = 'Unfortunately, you failed the test.';
    }
  
    Swal.fire({
      icon: 'info',
      title: 'Quiz Result',
      html: `
        <div class="quiz-result">
          <div class="quiz-result-row">
            <span>Total Questions:</span>
            <span>${totalQuestions}</span>
          </div>
          <div class="quiz-result-row">
            <span>Correct Answers:</span>
            <span>${this.correctCount}</span>
          </div>
          <div class="quiz-result-row">
            <span>Correct Rate:</span>
            <span>${correctRate}%</span>
          </div>
          <div class="quiz-result-row">
            <span>Average Response Time:</span>
            <span>${this.getAverageResponseTime()} seconds</span>
          </div>
          <div class="quiz-result-message">${message}</div>
        </div>
      `,
    });
    clearInterval(this.timer);
  }
  
  
  getAverageResponseTime(): string {
    if (this.responseTimes.length === 0) return '0';
    const sum = this.responseTimes.reduce((a, b) => a + b, 0);
    const avg = sum / this.responseTimes.length;
    return avg.toFixed(2);
  }
  // Add these methods to your QuizComponent class

previousQuestion(): void {
  if (this.currentQuestionIndex > 0) {
    this.currentQuestionIndex--;
  }
}

nextQuestion(): void {
  if (this.currentQuestionIndex < this.questions.length - 1) {
    this.currentQuestionIndex++;
  }
}

}