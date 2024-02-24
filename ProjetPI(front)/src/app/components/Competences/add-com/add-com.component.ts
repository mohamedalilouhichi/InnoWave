import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Competences } from 'src/app/models/competences';
import { CompetencesService } from '../competences.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-com',
  templateUrl: './add-com.component.html',
  styleUrls: ['./add-com.component.css']
})

export class AddComComponent implements OnInit{
  competences: Competences = new Competences(0, '', '', 0);
  
 

  constructor(private competencesService: CompetencesService ,private router: Router ) {}

  ngOnInit(): void {}
  navigateToAdd() {
    this.router.navigate(['/competence/get']);
  }
 

  addComp() {
    this.competencesService.addCompetence(this.competences).subscribe({
      next: (response) => {
        console.log("Competence added successfully", response);
        // Handle successful response, e.g., navigate to another page or show a success message
      },
      error: (error) => {
        console.error("There was an error adding the competence", error);
        // Handle error case
      }
    });
   
 }
}





