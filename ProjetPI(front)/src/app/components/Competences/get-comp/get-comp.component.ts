import { Component, OnInit } from '@angular/core';
import { CompetencesService } from '../competences.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-comp',
  templateUrl: './get-comp.component.html',
  styleUrls: ['./get-comp.component.css']
})
export class GetCompComponent implements OnInit {
  competences: any[] = [];

  constructor(private competencesService: CompetencesService, private router: Router) {}

  ngOnInit() {
    this.getCompetences();
  }
 
  getCompetences() {
    this.competencesService.getCompetences().subscribe(
      data => {
        this.competences = data;
        console.log('Données de la base :', this.competences);
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des compétences :', error);
      }
    );
  }

  updateCompetence(id: number) {
    this.router.navigate(['/competence/update', id]);
    // Logique pour mettre à jour la compétence avec l'ID spécifié
    console.log('Update competence with ID:', id);
  }

  deleteComp(idCompetences: number) {
    console.log('ID to delete:', idCompetences);
    if (confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
      this.competencesService.deleteCompetence(idCompetences).subscribe(
        () => {
          console.log('Compétence supprimée avec succès');
          this.getCompetences(); // Récupère à nouveau la liste des compétences après la suppression
        },
        error => {
          console.error('Une erreur s\'est produite lors de la suppression de la compétence :', error);
        }
      );
    } else {
      console.log('Suppression annulée');
    }
  }
  
  
}