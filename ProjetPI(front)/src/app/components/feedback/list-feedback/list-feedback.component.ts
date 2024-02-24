import { Component, OnInit } from '@angular/core';

import { FeedbackService } from '../service/feedback.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Feedback } from '../../models/feedback';

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
      (response:Feedback[]) => {
        this.listFeedbacks=response;
      },
      (error:HttpErrorResponse)=>{
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
