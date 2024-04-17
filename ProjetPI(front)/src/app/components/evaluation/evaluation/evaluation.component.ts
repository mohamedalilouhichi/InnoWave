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
  grosMots = ["idiot", "merde", "imbecile"]; // Liste des gros mots à détecter
  grosMotTrouve: boolean = false;

  constructor(private evaluationService: EvaluationService, private router: Router) { }
  texte!: string;
  message!: string;

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

    // Vérifier si des gros mots sont présents dans les commentaires
    this.detectGrosMots();

    // Si des gros mots sont trouvés, empêcher l'envoi du formulaire
    if (this.grosMotTrouve) {
      return;
    }

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

  detectGrosMots(): void {
    const mots = this.newEvaluation.comments.toLowerCase().split(/\s+/);
    this.grosMotTrouve = mots.some(mot => this.grosMots.includes(mot));
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

  evaluerTexte() {
    const mots = this.texte.toLowerCase().split(/\s+/);
    this.grosMotTrouve = mots.some(mot => this.grosMots.includes(mot));

    if (this.grosMotTrouve) {
      this.message = "Le texte contient des gros mots. Veuillez le corriger.";
    } else {
      this.evaluationService.evaluer(this.texte)
        .subscribe(
          response => {
            this.message = response;
          },
          error => {
            console.log(error);
            this.message = "An error occurred during the evaluation.";
          }
        );
    }
  }
}
