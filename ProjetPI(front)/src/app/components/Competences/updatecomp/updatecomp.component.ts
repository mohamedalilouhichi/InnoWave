import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetencesService } from '../competences.service';
import { Competences} from "../../../models/competences";
import {  EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-updatecomp',
  templateUrl: './updatecomp.component.html',
  styleUrls: ['./updatecomp.component.css']
})
export class UpdatecompComponent implements OnInit,OnChanges {
  @Input() competenceId: number | null = null;
  @Output() closeModalEvent = new EventEmitter<void>();

  competences: Competences | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';

  competence: Competences = new Competences(0, '', '', 0);


  constructor(private competencesService: CompetencesService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const competenceId = +params['id'];
      // Récupérer la compétence à partir de l'ID à l'aide du service CompetencesService
      this.getCompetence(competenceId);
    });
  }




  closeModal() {
    this.closeModalEvent.emit();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges - competenceId:', this.competenceId); // Add this log
  if (changes['competenceId'] && this.competenceId !== null) {
      this.getCompetence(this.competenceId);
  }
}
getCompetence(competenceId: number): void {
  console.log('Fetching competence for ID:', competenceId);
  this.isLoading = true;
  this.competencesService.getCompetenceById(competenceId).subscribe({
    next: (competence) => {
      if (competence) {
        this.competence = competence;
        this.errorMessage = '';
      } else {
        this.errorMessage = `No competence found with ID ${competenceId}`;
        this.competences = null; // Ensure previous state is cleared if no data is found
      }
    },
    error: (error) => {
      console.error("Error fetching competence:", error);
      this.errorMessage = "An error occurred while fetching the competence.";
    },
    complete: () => this.isLoading = false
  });
}



  UpdateComp() {
    if (this.competence.idCompetences && this.competence.name && this.competence.importanceLevel && this.competence.description) {
      this.competencesService.updateCompetence(this.competence.idCompetences, this.competence).subscribe(
        response => {
          console.log('Compétence mise à jour avec succès :', response);
          // Rediriger l'utilisateur vers la route '/competence/get' après la mise à jour réussie
          this.router.navigate(['/competence/get']);
        },
        error => {
          console.error('Erreur lors de la mise à jour de la compétence :', error);
          // Gérer l'erreur et afficher un message approprié à l'utilisateur
        }
      );
    } else {
      // Afficher un message d'erreur ou effectuer des actions appropriées si les valeurs sont manquantes
    }
  }


}
