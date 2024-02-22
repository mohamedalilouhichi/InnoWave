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
    if (this.newEvaluation.evaluationDate && this.newEvaluation.rating && this.newEvaluation.status) {
      this.evaluationService.AddEvaluation(this.newEvaluation).subscribe(
        () => {
          console.log('Evaluation added successfully');
          this.newEvaluation = new Evaluation();
          this.submitted = false;
          this.fetchEvaluations();
          
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
}
