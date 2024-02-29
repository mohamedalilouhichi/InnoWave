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
    this.fetchFeedback();
    this.feetchingFeed();

    this.getAllFeedbacks();

   
  }



  removeFeedback(idFeedback:number){
    if(confirm('Are you sure you want to delete this feedback? ')){
      this.feedbackService.removeFeedback(idFeedback).subscribe(()=>{
        this.feetchingFeed();
        console.log('Feedback deleted successfully.');
        
    },
    (error) => {
      console.error('Error deleting feedback:', error);
    }
      );
  } else {
    console.log('Deletion canceled');
  }
  }



  feetchingFeed(): void{
    this.feedbackService.getFeedback().subscribe(
      (data: Feedback[])=> {
        console.log('fetched ffedback :', data);
        this.feedbacks = data;
      },
      (erreur)=> {
        console.log('Erreur de chargement des données ', erreur);
      }
    )
  }







  fetchFeedback() {
    this.feedbackService.getFeedback().subscribe((data: any[]) => {
      console.log(data);
      this.feedbacks = data;
    });
  }
}
