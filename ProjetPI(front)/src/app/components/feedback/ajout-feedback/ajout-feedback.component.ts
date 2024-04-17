import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../service/feedback.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-ajout-feedback',
  templateUrl: './ajout-feedback.component.html',
  styleUrls: ['./ajout-feedback.component.css']
})
export class AjoutFeedbackComponent implements OnInit {

  feedbacks: any[] = [];
  newFeed: any = {};
  feedbackForm!: FormGroup ;
  formData = new FormData();

  constructor(
    private feedbackService: FeedbackService,
    private formBuilder: FormBuilder
  ){ }

ngOnInit(): void {
  this.feedbackForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    acontent: new FormControl('', [Validators.required]),
    dateSubmitted: new FormControl('', [Validators.required]),
  

  });
  this.fetchFeed();
  
 console.log("Success code")   
}

public addFeedback(): void{

 // const formattedDate = new Date().toISOString().split('T')[0];
  // Append the formatted date to formData
 // this.formData.append('dateSubmitted', formattedDate);

  const formData = this.feedbackForm.value;
  formData.dateSubmitted = new Date();
  
  this.formData.append('name', this.feedbackForm.get('name')?.value);
  this.formData.append('surname', this.feedbackForm.get('surname')?.value);
  this.formData.append('email', this.feedbackForm.get('email')?.value);
  this.formData.append('acontent', this.feedbackForm.get('acontent')?.value);
 // this.formData.append('dateSubmitted', new Date().toString());

  this.formData.forEach((value, key) => {
    console.log(`Field name: ${key}`);
    console.log(`Field value: ${value}`);
  });

  console.log(this.feedbackForm.value)

  this.feedbackService.addFeedback(this.feedbackForm.value).subscribe(()=>  {
  console.log("le feed a été ajouté");

  });
}



addFeedbackAndAssignToStudentAndEntreprise(idUser:string, idEntreprise:string){
  const formData = this.feedbackForm.value;
  formData.dateSubmitted = new Date();
  
  this.formData.append('idUser', this.feedbackForm.get('idUser')?.value);
  this.formData.append('idEntreprise', this.feedbackForm.get('idEntreprise')?.value);
  this.formData.append('name', this.feedbackForm.get('name')?.value);
  this.formData.append('surname', this.feedbackForm.get('surname')?.value);
  this.formData.append('email', this.feedbackForm.get('email')?.value);
  this.formData.append('acontent', this.feedbackForm.get('acontent')?.value);

  this.formData.append('moyrating', '0'); // Initialize moyrating to 0
 // this.formData.append('dateSubmitted', new Date().toString());

  this.formData.forEach((value, key) => {
    console.log(`Field name: ${key}`);
    console.log(`Field value: ${value}`);
  });

  const feedData = {
    ...this.feedbackForm.value,
    User: {
      idUser: idUser
    },
    Entreprise: {
      idEntreprise : idEntreprise
    }
  };

  console.log(this.feedbackForm.value)
 // alert("Your feedback w!");
 

  this.feedbackService.addFeedbackAndAssignToStudentAndEntreprise(this.feedbackForm.value, idUser, idEntreprise).subscribe(()=>  {
  console.log("le feed a été ajouté");

  },
  (error)=>{console.log("il y a une erreur"+ error)});

}

  
  


fetchFeed(){
  this.feedbackService.getFeedback().subscribe((data: any[]) => {
    console.log(data);
    this.feedbacks = data;
  });
}

}
