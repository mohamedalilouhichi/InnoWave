import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CandidatureService } from '../service/candidature.service';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { getLocaleDateFormat } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Candidature } from '../../models/candidature';
import { User } from '../../models/user';
import { Stage } from '../../models/stage';

@Component({
  selector: 'app-ajout-candidature',
  templateUrl: './ajout-candidature.component.html',
  styleUrls: ['./ajout-candidature.component.css']
})
export class AjoutCandidatureComponent implements OnInit {
  
  candidatures: Candidature[] = [];
  newCandidature: any = {};
  selectedFile!: File;
  formData = new FormData();
 // date: Date;
 // localDate: string;
  //selectedCandidature: Candidature = new Candidature();

  constructor(
    private candidatureService: CandidatureService, 
    private formBuilder: FormBuilder,
   // private datePipe: DatePipe
     )
    {
     // this.date = new Date();
      //this.localDate = this.datePipe.transform(this.date, 'yyyy-MM-dd')!;
    }

  candidacyform!: FormGroup;

  ngOnInit(): void {
    this.candidacyform = new FormGroup({
      Name: new FormControl('', [Validators.required, Validators.required]),
      Surname: new FormControl('', [Validators.required, Validators.required]),
      Level: new FormControl('', Validators.required),
      CV: new FormControl('', Validators.required),
      dateSoumission: new FormControl('', Validators.required),
      statut: new FormControl('', Validators.required),
      
    });
    this.fetchCandidature();
  }

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  addCandidacy(): void {
     // Format the date
  const formattedDate = new Date().toISOString().split('T')[0];
  // Append the formatted date to formData
  this.formData.append('dateSoumission', formattedDate);

  
    this.formData.append('Name', this.candidacyform.get('Name')?.value);
    this.formData.append('Surname', this.candidacyform.get('Surname')?.value);
    this.formData.append('Level', this.candidacyform.get('Level')?.value);
    this.formData.append('CV', this.selectedFile);
    this.formData.append('dateSoumission', new Date().toString());
    this.formData.append('statut', this.candidacyform.get('statut')?.value);
    
    
    this.formData.forEach((value, key) => {
      console.log(`Field name: ${key}`);
      console.log(`Field value: ${value}`);
    });

    console.log(this.candidacyform.value)
   
    this.candidatureService.addCandidacy(this.formData).subscribe(() => {

      console.log("la candidature a été ajouté");
     // console.log(this.selectedCandidature);

    });
  }

  fetchCandidature() {
    this.candidatureService.getCandidature().subscribe((data: any[]) => {
      console.log(data);
      this.candidatures = data;
    });
  }




  addCandidatureAndAssignToStudentAndStage(idUser:string, idStage : string){

    this.formData.append('idUser', idUser);
    this.formData.append('idStage', idStage);
    this.formData.append('Name', this.candidacyform.get('Name')?.value);
    this.formData.append('Surname', this.candidacyform.get('Surname')?.value);
    this.formData.append('Level', this.candidacyform.get('Level')?.value);
    this.formData.append('CV', this.selectedFile);
    this.formData.append('statut', this.candidacyform.get('statut')?.value);
    

    this.formData.forEach((value, key) => {
      console.log(`Field name: ${key}`);
      console.log(`Field value: ${value}`);
    });

    const candidacyData = {
      ...this.candidacyform.value,
      User: {
        idUser: idUser
      },
      Stage: {
        idStage : idStage
      }
    };

    this.candidatureService.addCandidatureAndAssignToStudentAndStage(this.formData,idUser,idStage).subscribe(()=>{
      console.log("candidacy affected");
  
  }, (error)=>{console.log("il y a une erreur"+ error)});
}




}
