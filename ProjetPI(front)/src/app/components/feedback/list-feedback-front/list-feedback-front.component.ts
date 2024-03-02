import { Component } from '@angular/core';
import { Feedback } from '../../models/feedback';
import { FeedbackService } from '../service/feedback.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-feedback-front',
  templateUrl: './list-feedback-front.component.html',
  styleUrls: ['./list-feedback-front.component.css']
})
export class ListFeedbackFrontComponent {
  feedbacks: any[] = [];
  newFeedback: any = {};


  listFeedbacks? : Feedback[];

  constructor(private feedbackService : FeedbackService) { }

  getAllFeedbacks(): void{
    this.feedbackService.getFeedback().subscribe(
      (response: Feedback[]) => {
        console.log('Données des feedbacks récupérées :', response); // Afficher les données dans la console
        this.listFeedbacks = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Une erreur s\'est produite lors de la récupération des feedbacks :', error); // Afficher l'erreur dans la console
        alert(error.message);
      }
    );
  }


  ngOnInit(): void { 
    this.fetchFeedback();
    this.getAllFeedbacks();
  }

  fetchFeedback() {
    this.feedbackService.getFeedback().subscribe((data: any[]) => {
      console.log(data);
      this.feedbacks = data;
    });
  }

}
