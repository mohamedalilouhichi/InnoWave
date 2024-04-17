import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../evaluation.service';
import { Evaluation } from 'src/app/models/Evaluation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-evaluation',
  templateUrl: './update-evaluation.component.html',
  styleUrls: ['./update-evaluation.component.css']
})
export class UpdateEvaluationComponent implements OnInit {
  selectedEvaluation: Evaluation = new Evaluation();
  submitted: boolean = false;
  grosMots = ["idiot", "merde", "imbecile"]; // Liste des gros mots à détecter
  grosMotTrouve: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private evaluationService: EvaluationService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getEvaluationById(id);
  }

  getEvaluationById(id: number): void {
    this.evaluationService.getEvaluationById(id).subscribe(
      (data: Evaluation) => {
        console.log(data);
        this.selectedEvaluation = data;
      },
      (error: any) => {
        console.error('Error fetching evaluation:', error);
      }
    );
  }

  updateEvaluation(): void {
    this.submitted = true;

    // Vérifier si des gros mots sont présents dans les commentaires
    this.detectGrosMots();

    // Si des gros mots sont trouvés, empêcher la mise à jour de l'évaluation
    if (this.grosMotTrouve) {
      return;
    }

    if (this.isValidEvaluation()) {
      this.evaluationService.updateEvaluation(this.selectedEvaluation).subscribe(
        () => {
          console.log('Evaluation updated successfully');
          this.router.navigate(['/evaluation/show-evaluation']);
        },
        (error: any) => {
          console.error('Error updating evaluation:', error);
        }
      );
    }
  }

  isValidEvaluation(): boolean {
    return this.selectedEvaluation.evaluationDate && this.selectedEvaluation.rating != null && this.selectedEvaluation.status != null;
  }

  detectGrosMots(): void {
    const mots = this.selectedEvaluation.comments.toLowerCase().split(/\s+/);
    this.grosMotTrouve = mots.some(mot => this.grosMots.includes(mot));
  }

  cancelUpdate(): void {
    this.router.navigate(['/evaluation/show-evaluation']);
  }
}
