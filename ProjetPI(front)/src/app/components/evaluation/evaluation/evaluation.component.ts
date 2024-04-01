import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../evaluation.service';
import { Evaluation } from 'src/app/models/Evaluation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  evaluations: Evaluation[] = [];
  newEvaluation: Evaluation = new Evaluation();
  submitted: boolean = false;
  ratingError: string = '';
  currentDate: Date = new Date(); // Déclaration de la propriété currentDate

  constructor(private evaluationService: EvaluationService, private router: Router) { }

  ngOnInit(): void {
    this.fetchEvaluations();
  }

  fetchEvaluations(): void {
    this.evaluationService.getAllEvaluations().subscribe(
      (data: Evaluation[]) => {
        console.log(data);
        this.evaluations = data;
      },
      (error: any) => {
        console.error('Error fetching evaluations:', error);
      }
    );
  }

  addEvaluation(): void {
    this.submitted = true;
    
    // Définir la date d'évaluation sur la date système
    this.newEvaluation.evaluationDate = new Date();

    // Vérifier si tous les champs requis sont remplis
    if (this.newEvaluation.rating && this.newEvaluation.status) {
      // Vérifier si le rating est valide
      if (this.newEvaluation.rating < 0 || this.newEvaluation.rating > 5) {
        this.ratingError = 'Rating must be between 0 and 5';
        return;
      }

      // Appeler le service pour ajouter l'évaluation
      this.evaluationService.AddEvaluation(this.newEvaluation).subscribe(
        () => {
          console.log('Evaluation added successfully');
          this.newEvaluation = new Evaluation(); // Réinitialiser le formulaire
          this.submitted = false; // Réinitialiser l'état de soumission
          this.fetchEvaluations(); // Mettre à jour la liste des évaluations

          // Redirection vers la page des listes après avoir ajouté avec succès
          this.router.navigate(['/evaluation/show-evaluation']);
        },
        (error: any) => {
          console.error('Error adding evaluation:', error);
        }
      );
    }
  }

  deleteEvaluation(id: number): void {
    this.evaluationService.deleteEvaluation(id).subscribe(
      () => {
        console.log('Evaluation deleted successfully');
        this.fetchEvaluations();
      },
      (error: any) => {
        console.error('Error deleting evaluation:', error);
      }
    );
  }

  cancel() {
    this.router.navigate(['/evaluation/show-evaluation']);
  }
}


