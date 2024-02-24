import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CandidatureService } from '../service/candidature.service';
import { Candidature } from '../../models/candidature';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { getLocaleDateFormat } from '@angular/common';



@Component({
  selector: 'app-ajout-candidature',
  templateUrl: './ajout-candidature.component.html',
  styleUrls: ['./ajout-candidature.component.css']
})
export class AjoutCandidatureComponent implements OnInit {
  

  candidatures: any[] = [];
  newCandidature: any = {}; // Define newCandidature object for adding candidatures

  candidacyform!:FormGroup
  
  selectedFile!: File;
  
  constructor(
    private candidatureService: CandidatureService, 
    private formBuilder: FormBuilder
    ){
      this.candidacyform = this.formBuilder.group({
        name:  ['',Validators.required],
        surname:  ['',Validators.required],
        level:  ['',Validators.required],
        cv:  ['',Validators.required],
        dateSoumission: ['', Validators.required],
        statut:  ['',Validators.required],
        commentaires:  ['',Validators.required],
      });
    }

    onFileSelected(event: any) {
      const CV = event.target.files?.[0]; // Utilisation de la propriété optionnelle pour éviter les erreurs si event.target.files est null ou undefined
      if (CV) {
          this.candidacyform.get('cv')?.setValue(CV); // Utilisation de la propriété optionnelle pour éviter les erreurs si candidacyform.get('cv') est null ou undefined
      }
  }
  


  public addCandidacy(): void {
    const formData = new FormData();
  formData.append('name', this.candidacyform.get('name')?.value);
  formData.append('surname', this.candidacyform.get('surname')?.value);
  formData.append('level', this.candidacyform.get('level')?.value);
  formData.append('cv', this.candidacyform.get('cv')?.value);
  formData.append('dateSoumission', new Date().toString());
  formData.append('statut', this.candidacyform.get('statut')?.value);
  formData.append('commentaires', this.candidacyform.get('commentaires')?.value);

  this.candidatureService.addCandidacy(formData).subscribe(() => {
    console.log("bravooooo", formData)
    // alert('La candidature a été ajoutée avec succès')
    // window.location.reload()
  }, (error: HttpErrorResponse) => {
    console.error("error adding candidacy: ", error);
    alert("An error occured while adding candidacy: " + error.message);
  }); 
  }



  fetchCandidature() {
    this.candidatureService.getCandidature().subscribe((data: any[]) => {
      console.log(data);
      this.candidatures = data;
    });
  }





  ngOnInit() : void {
   // this.fetchCandidature();
   // this.addCandidacy();
  
    console.log("code ca maaaaaaaaarche")
  }
}
