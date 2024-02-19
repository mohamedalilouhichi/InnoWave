import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CandidatureService } from '../service/candidature.service';
import { Candidature } from '../../models/candidature';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ajout-candidature',
  templateUrl: './ajout-candidature.component.html',
  styleUrls: ['./ajout-candidature.component.css']
})
export class AjoutCandidatureComponent implements OnInit {
  


  candidatures: any[] = [];
  newCandidature: any = {}; // Define newCandidature object for adding candidatures

  //candidacyform!:FormGroup
 
  
  @Output() addform=new EventEmitter<Candidature>
  
  constructor(
    private candidatureService: CandidatureService, 
    private formBuilder: FormBuilder
    ){ }


  public addCandidacy(): void {
   // this.candidatureService.addCandidacy(this.newCandidature).subscribe();

    const candidacyform: FormGroup = this.formBuilder.group({
      name:  ['',Validators.required],
      surname:  ['',Validators.required],
      level:  ['',Validators.required],
      cv:  ['',Validators.required],
      datesoumission:  ['',Validators.required],
      statut:  ['',Validators.required],
      commentaire:  ['',Validators.required],
      
    });

    this.candidatureService.addCandidacy(candidacyform.value).subscribe(
      (response) => {
        console.log('succeesssssss', response);
        candidacyform.reset();
      },
      (error) => {
        console.log('erreuuuuuuurrr : ', error);
      }
      );
  


  }



  //public addCandidature(): void {
  //  this.candidatureService.addCandidature(this.newCandidature).subscribe(
  //    (response: Candidature) => {
  //    this.candidatures.push(response);
      

  //    console.log("New candidate added");
  //    },

  //  (error: HttpErrorResponse) => {
  //    alert(error.message);
//  }
  //    );
    
    
  //}


  ngOnInit() : void {
   
    


    this.fetchCandidature();
   // this.addCandidature();
   this.addCandidacy();
  }

  

  fetchCandidature() {
    this.candidatureService.getCandidature().subscribe((data: any[]) => {
      console.log(data);
      this.candidatures = data;
    });
  }
  



}
