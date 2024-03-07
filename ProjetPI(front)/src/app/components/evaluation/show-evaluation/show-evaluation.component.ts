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
  sortedEvaluations: Evaluation[] = [];
  filteredEvaluations: Evaluation[] = []; // Liste filtrée d'évaluations
  selectedStatus: string = ''; 
  selectedEvaluation: Evaluation | null = null; // Stocke les détails de l'évaluation sélectionnée
  searchYear: string = ''; // Propriété de liaison pour le champ de recherche par année



  constructor(private router: Router, private evaluationService: EvaluationService) { }

  ngOnInit(): void {
    this.fetchEvaluations();
    
  }

  fetchEvaluations(): void {
    this.evaluationService.getAllEvaluations().subscribe(
      (data: Evaluation[]) => {
        console.log(data);
        this.evaluations = data;
        // Initialisation des évaluations triées et filtrées avec les évaluations récupérées
        this.sortedEvaluations = [...this.evaluations];
        this.filteredEvaluations = [...this.evaluations];

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
  sortEvaluationsByDate(): void {
    this.filteredEvaluations.sort((a, b) => {
        return new Date(a.evaluationDate).getTime() - new Date(b.evaluationDate).getTime();
    });
}

  filterEvaluationsByStatus(): void {
    if (this.selectedStatus) {
      this.filteredEvaluations = this.evaluations.filter(evaluation => evaluation.status === this.selectedStatus); // Filtrer les évaluations par statut spécifique
    } else {
      this.filteredEvaluations = this.evaluations; // Si aucun statut n'est sélectionné, afficher toutes les évaluations
    }
  }
  
  selectEvaluation(evaluation: Evaluation): void {
    this.selectedEvaluation = evaluation;
  }

  // Méthode pour naviguer vers la page des détails de l'évaluation sélectionnée
  viewEvaluationDetails(evaluation: Evaluation): void {
    if (evaluation) {
        // Naviguer vers la page des détails de l'évaluation sélectionnée
        this.router.navigate(['/evaluation-details', evaluation.idEvaluation]);
    }
}
sortEvaluationsByRating(): void {
  this.filteredEvaluations.sort((a, b) => b.rating - a.rating);
}
searchByYear(): void {
  if (this.searchYear.trim() === '') {
    this.filteredEvaluations = [...this.evaluations];
    return;
  }

  const year = parseInt(this.searchYear, 10);
  if (!isNaN(year)) {
    this.filteredEvaluations = this.evaluations.filter(evaluation => {
      const evaluationYear = new Date(evaluation.evaluationDate).getFullYear();
      return evaluationYear === year;
    });
  } else {
    // Afficher un message d'erreur ou gérer le cas où l'utilisateur entre une année invalide
  }
}

}
