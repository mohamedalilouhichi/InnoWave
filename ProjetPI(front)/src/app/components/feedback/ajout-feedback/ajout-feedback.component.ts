import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../service/feedback.service';

@Component({
  selector: 'app-ajout-feedback',
  templateUrl: './ajout-feedback.component.html',
  styleUrls: ['./ajout-feedback.component.css']
})
export class AjoutFeedbackComponent implements OnInit {

  feedbacks: any[] = [];
  newFeed: any = {};
  feedbackForm!:FormGroup

  constructor(
    private feedbackService: FeedbackService,
    private formBuilder: FormBuilder
  ){
    this.feedbackForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      acontent: ['', Validators.required],
      dateSubmitted: ['', Validators.required]
    })
  }

ngOnInit(): void {
 console.log("Success code")   
}

public addFeedback(): void{
  //const formData = this.newFeed.value;
  //formData.dateSubmitted = new Date();
  
  this.feedbackService.addFeedback(this.newFeed.value).subscribe(() => {
    console.log("Enjoy!")
  });
}

fetchFeed(){
  this.feedbackService.getFeedback().subscribe((data: any[]) => {
    console.log(data);
    this.feedbacks = data;
  });
}

}
