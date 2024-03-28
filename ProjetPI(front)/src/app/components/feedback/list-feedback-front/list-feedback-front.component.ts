import { Component } from '@angular/core';
import { Feedback, Rating } from '../../models/feedback';
import { FeedbackService } from '../service/feedback.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-feedback-front',
  templateUrl: './list-feedback-front.component.html',
  styleUrls: ['./list-feedback-front.component.css'],
  
})
export class ListFeedbackFrontComponent {
  rating = 0;

 // idUser =4;

  feedbacks: any[] = [];
  newFeedback: any = {};
  //idFeedback :number | undefined;
  // New properties for rating
  ratedPosts: Set<number> = new Set();
  isRatingEnabled: boolean = true; // Adjust as needed

  listFeedbacks? : Feedback[];

  constructor(private feedbackService : FeedbackService) { }

  getAllFeedbacks(): void{
    this.feedbackService.getFeedback().subscribe(
      (response: Feedback[]) => {
        console.log('Données des feedbacks récupérées :', response); // Afficher les données dans la console
        this.listFeedbacks = response;
        
       /* for (let index = 0; index < this.listFeedbacks.length; index++) {
          
         for (let index2 = 0; index2 < this.listFeedbacks[index].ratings.length; index2++) {
          if (this.listFeedbacks[index].ratings[index2].idUser == this.idUser) {
            this.listFeedbacks[index].localVariableRating = this.listFeedbacks[index].ratings[index2].moyrating ;
            break;
          }
          
         }
        }*/
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

  
  toggleRating(post: any): void {
    const postId = post.idPost;
    if (this.ratedPosts.has(postId)) {
      this.removeRating(postId);
    } else {
      this.addRating(postId);
    }
  }
  isRated(post: any): boolean {
    return this.ratedPosts.has(post.idPost);
  }
  ratingStar(event: Event): void {
    // Your implementation goes here
    // You can access the selected checkbox value using event.target as needed
    console.log('Rating changed:', (event.target as HTMLInputElement).checked);
  }



  addRating(feedback: Feedback): void {
    const rate: Rating = {
      idFeedback: feedback.idFeedback,
      idRating: 0, // Provide a default or dummy value for idRating
      idUser: 4,   // Provide a default or dummy value for idUser
      status: '',  // Provide a default or dummy value for status
      moyrating : feedback.localVariableRating // Provide a default or dummy value for moyRating

    };
    console.log(rate);
    console.log(feedback)
    
  
    this.feedbackService.addRating(rate).subscribe(
      (response: any) => { // Assuming 'post' is not defined, changed to 'any'
        // Additional actions if needed
      },
      (error) => {
        console.error('Error adding rating:', error);
        // Handle errors here
      }
    );
  }

  

  private removeRating(rating:Rating ): void {
    

    this.feedbackService.removeRating(rating).subscribe(
      () => {
        // Additional actions if needed
      },
      (error) => {
        console.error('Error removing rating:', error);
        // Handle errors here
      }
    );
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


  selectedFeedback: Feedback | null = null;





}
