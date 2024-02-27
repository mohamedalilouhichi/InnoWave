import { Component, OnInit } from '@angular/core';

import { FeedbackService } from '../service/feedback.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Feedback } from '../../models/feedback';
import Swiper from 'swiper';

@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html',
  styleUrls: ['./list-feedback.component.css']
})
export class ListFeedbackComponent implements OnInit {
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
    this.fetchCandidature();

    this.getAllFeedbacks();

   
  }



  fetchCandidature() {
    this.feedbackService.getFeedback().subscribe((data: any[]) => {
      console.log(data);
      this.feedbacks = data;
    });
  }
}
