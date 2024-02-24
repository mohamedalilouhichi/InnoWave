import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetencesService } from '../competences.service';
import { Competences } from 'src/app/models/competences';

@Component({
  selector: 'app-updatecomp',
  templateUrl: './updatecomp.component.html',
  styleUrls: ['./updatecomp.component.css']
})
export class UpdatecompComponent implements OnInit {
  competence: Competences = new Competences(0, '', '', 0);
  

  constructor(private competencesService: CompetencesService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const competenceId = +params['id'];
      // Récupérer la compétence à partir de l'ID à l'aide du service CompetencesService
      this.getCompetence(competenceId);
    });
  }
  
  getCompetence(competenceId: number) {
    this.competencesService.getCompetenceById(competenceId).subscribe(
      response => {
        console.log('Compétence récupérée avec succès :', response);
        // Mettre à jour la propriété competence avec les données récupérées
        this.competence = response;
      },
      error => {
        console.error('Erreur lors de la récupération de la compétence :', error);
        // Gérer l'erreur et afficher un message approprié à l'utilisateur
      }
    );
  }
  

  UpdateComp() {
  
    if (this.competence.idCompetences && this.competence.name && this.competence.importanceLevel && this.competence.description) {
      this.competencesService.updateCompetence(this.competence.idCompetences, this.competence).subscribe(
        response => {
          console.log('Compétence mise à jour avec succès :', response);
          // Effectuer les actions nécessaires après la mise à jour (redirection, messages, etc.)
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