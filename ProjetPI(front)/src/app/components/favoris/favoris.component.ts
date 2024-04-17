// favoris.component.ts
import { Component, OnInit } from '@angular/core';
import { PlanningService } from '../planning/planning.service';
import { FavorisPlan } from 'src/app/models/Planning';
import { Planning } from 'src/app/models/Planning';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
  favoris: FavorisPlan[] = [];
  planningDetails: Planning[] = [];

  constructor(private planningService: PlanningService) {}

  ngOnInit() {
    this.loadFavoritesWithDetails();
  }

  loadFavoritesWithDetails() {
    this.planningService.getAllFavorisPlans().subscribe(
      favoris => {
        for (let favori of favoris) {
          this.planningService.getPlanningById(favori.idPlanning).subscribe(
            planning => {
              this.planningDetails.push(planning);
            },
            error => {
              console.error('Erreur lors du chargement des détails du planning :', error);
            }
          );
        }
        this.favoris = favoris;
      },
      error => {
        console.error('Erreur lors du chargement des favoris :', error);
      }
    );
  }

  removeFromFavorites(index: number) {
    const favoriToDelete = this.favoris[index];
    this.planningService.deleteFavorisPlan(favoriToDelete.idFavoris).subscribe(
      () => {
        const indexToDelete = this.favoris.findIndex(favori => favori.idFavoris === favoriToDelete.idFavoris);
        if (indexToDelete !== -1) {
          this.favoris.splice(indexToDelete, 1);
          this.planningDetails.splice(indexToDelete, 1);
        }
      },
      error => {
        console.error('Erreur lors de la suppression du planning des favoris :', error);
      }
    );
  }
  
}
