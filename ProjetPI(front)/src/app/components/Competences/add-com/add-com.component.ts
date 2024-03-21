import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Competences } from 'src/app/models/competences';
import { CompetencesService } from '../competences.service';

@Component({
  selector: 'app-add-com',
  templateUrl: './add-com.component.html',
  styleUrls: ['./add-com.component.css']
})
export class AddComComponent implements OnInit {
  competences: Competences = new Competences(0, '', '', 0);
  id!: number; // Identifiant général pour un utilisateur ou un stage
  context!: string; // 'user' ou 'stage'

  constructor(
    private competencesService: CompetencesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extraire les paramètres 'id' et 'context' de la route
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.context = params['context'];

      if (!this.id || !this.context) {
        console.error("ID and context are required");
        // Redirection optionnelle si l'ID ou le contexte n'est pas fourni
      }
    });
  }

  addComp() {
    if (this.context === 'user') {
      // Ajouter une compétence à un utilisateur
      this.competencesService.addCompetenceToUser(this.id, this.competences).subscribe({
        next: (response) => {
          console.log("Competence added successfully to user", response);
          this.router.navigate(['/competence/get']); // Ajustez la route selon vos besoins
        },
        error: (error) => {
          console.error("There was an error adding the competence to user", error);
        }
      });
    } else if (this.context === 'stage') {
      // Ajouter des compétences à un stage
      // Note : Assurez-vous que votre service et backend acceptent une liste pour ce cas
      this.competencesService.addCompetencesToStage(this.id, [this.competences]).subscribe({
        next: (response) => {
          console.log("Competence(s) added successfully to stage", response);
          this.router.navigate(['/competence/get']); // Ajustez la route selon vos besoins
        },
        error: (error) => {
          console.error("There was an error adding the competence(s) to stage", error);
        }
      });
    }
  }
}
