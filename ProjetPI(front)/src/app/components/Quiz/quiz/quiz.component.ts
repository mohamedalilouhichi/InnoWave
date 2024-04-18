import {  Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { QuizService } from '../quiz.service';
import { QuizQuestion } from 'src/app/models/QuizQuestion'; // Ensure this path matches your project structure
import Swal from 'sweetalert2';
import { User } from 'src/app/models/User';
import { QuizResult } from 'src/app/models/QuizResult';
import { parsePath } from 'react-router-dom';

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
  totalTime: number = 3 * 60; 
  user?: User; // Property to hold user information
  currentQuizId?: number;
  correctRate: string = '0.00'; 
  userEmail: string = ''; 
  userName: string = '';
  passed: boolean | undefined;
  showResultsButton: boolean | undefined;

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
      console.error('Domain is required to start the quiz.');
      return;
    }
  
    this.quizService.getQuizData(domain).subscribe(
      data => {
        console.log("Received quiz data:", data);  // Log the data to inspect its structure
        if (data.domains && Array.isArray(data.domains)) {
          this.questions = data.domains.flatMap(d => d.questions);
          this.initializeQuiz();
        } else {
          console.error('Unexpected data structure:', data);
        }
      },
      error => {
        console.error('There was an error fetching the quiz data:', error);
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
    // Check if the quiz is already finished to prevent further interactions
    if (this.quizFinished) {
      return; // Early return if the quiz has already ended
    }
  
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
      this.submitQuiz(); // Optionally call a function to handle post-quiz logic
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

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  

  
  prepareCertificate(): void {
    if (this.isValidEmail(this.userEmail) && this.userName) {
      const score = this.calculateCorrectRate(this.questions.length);
      this.sendCertificate(this.userEmail, this.userName, parseFloat(score));
    } else {
      Swal.fire('Invalid Input', 'Please enter a valid email and name.', 'error');
    }
  }
  
  submitQuiz(): void {
    this.clearQuizTimer();
    this.markQuizAsFinished();
    const totalQuestions = this.questions.length;
    const correctRate = this.calculateCorrectRate(totalQuestions);
    const passed = this.checkIfPassed();
    this.displayResults( totalQuestions);
  }
  





  
  displayResults(totalQuestions: number): void {
    let passed = this.checkIfPassed();
    let correctRate = this.calculateCorrectRate(totalQuestions);

    if (!passed) {
      Swal.fire({
        icon: 'error',
        title: 'Quiz Result',
        html: `Unfortunately, you failed the test. <br> Correct Rate: ${correctRate}%`,
        confirmButtonText: 'Try Again'
      });
    } else {
      // Handling the passed case, assuming there's a different part of the UI to show success
      Swal.fire({
        icon: 'success',
        title: 'Congratulations!',
        html: `You have passed the test! <br> Correct Rate: ${correctRate}%`,
        confirmButtonText: 'View Certificate'
      });
    }
  }


  

clearQuizTimer(): void {
    clearInterval(this.timer);
    this.timer = null; // Clear the timer to prevent memory leaks
}

markQuizAsFinished(): void {
    this.quizFinished = true; // Mark the quiz as finished
}

calculateCorrectRate(totalQuestions: number): string {
    return ((this.correctCount / totalQuestions) * 100).toFixed(2);
}

checkIfPassed(): boolean {
    let passed = this.correctCount >= 7; // Assuming 7 correct answers is the passing criteria
    this.passed = passed; // Store the passed status in the component
    return passed;
}





sendCertificate(email: string, name: string, score: number): void {
  // Check if the email and name are provided before attempting to send the certificate
  if (!email || !name) {
    Swal.fire('Error', 'User email or name is missing.', 'error');
    return;
  }

  // Attempt to send the certificate via the quiz service
  this.quizService.sendCertificate(email, name, score).subscribe({
    next: () => {
      Swal.fire('Success', 'Your quiz results have been submitted and your certificate is on its way!', 'success');
    },
    error: (error) => {
      console.error('Failed to send certificate:', error);
      Swal.fire('Error', 'There was a problem submitting your quiz results.', 'error');
    }
  });
}






submitResults(): void {
  if (!this.user || this.currentQuizId === undefined) {
      Swal.fire('Error', 'User information or quiz information is missing.', 'error');
      return;
  }

  const correctRate = this.calculateCorrectRate(this.questions.length); // Assume calculateCorrectRate returns a string
  const passed = parseFloat(correctRate) >= 70;

  const quizResult = new QuizResult(
      this.user,
      this.currentQuizId,
      this.questions,
      parseFloat(correctRate), // Assume calculateCorrectRate returns something that needs to be parsed
      passed
  );

  this.quizService.submitQuizResults(quizResult).subscribe({
      next: response => {
          Swal.fire('Success', 'Your quiz results have been submitted and your certificate is on its way!', 'success');
      },
      error: error => {
          console.error('Failed to submit quiz results:', error);
          Swal.fire('Error', 'There was a problem submitting your quiz results.', 'error');
      }
  });
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