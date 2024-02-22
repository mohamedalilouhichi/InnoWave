import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EvaluationService } from '../evaluation.service';
import { Evaluation } from 'src/app/models/Evaluation';

@Component({
  selector: 'app-show-evaluation',
  templateUrl: './show-evaluation.component.html',
  styleUrls: ['./show-evaluation.component.css']
})
export class ShowEvaluationComponent implements OnInit {
  evaluations: Evaluation[] = [];

  constructor(private router: Router, private evaluationService: EvaluationService) { }

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

  deleteEvaluation(id: number): void {
    if (confirm('Are you sure you want to delete this evaluation?')) {
      this.evaluationService.deleteEvaluation(id).subscribe(
        () => {
          console.log('Evaluation deleted successfully');
          // Supprimer l'évaluation de la liste locale
          this.evaluations = this.evaluations.filter(evaluation => evaluation.idEvaluation !== id);
        },
        (error: any) => {
          console.error('Error deleting evaluation:', error);
        }
      );
    }
  }

  updateEvaluation(id: number): void {
    this.router.navigate(['/update', id]); // Rediriger vers la page de mise à jour avec l'ID de l'évaluation
  }

  addEvaluationRedirect(): void {
    this.router.navigate(['/add']); // Rediriger vers la page d'ajout
  }
}
