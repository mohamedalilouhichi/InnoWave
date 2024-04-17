import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { PlanningService } from '../planning.service'; 
import { Planning } from 'src/app/models/Planning'; 
import { FavorisPlan } from 'src/app/models/Planning';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridYear'
    },
    events: []
  };

  plannings: Planning[] = [];
  filteredPlannings: Planning[] = [];
  favorites: FavorisPlan[] = []; // Ajout de la liste des favoris
  idUser!: number;
  idPlanning!: number;
  favoriExiste!: boolean;
  selectedLevel: string = '';

  // Liste des niveaux dans l'ordre souhaité
  niveauxList: string[] = ["First_year", "Second_year", "Third_year", "Fourth_year"];

  constructor(private planningService: PlanningService) {}

  ngOnInit() {
    this.loadPlannings();
    this.loadFavorites();
  }

  loadPlannings() {
    this.planningService.getAllPlannings().subscribe(
      plannings => {
        this.plannings = plannings;
        this.filterPlanningsByLevel(); // Filtre les plannings initialement
        this.updateCalendarEvents();
      },
      error => {
        console.error('Error loading plannings:', error);
      }
    );
  }

  filterPlanningsByLevel() {
    this.filteredPlannings = this.plannings.filter(planning => {
      if (this.selectedLevel) {
        return planning.niveau.toLowerCase().includes(this.selectedLevel.toLowerCase());
      } else {
        return true; // Si aucun niveau sélectionné, retourne tous les plannings
      }
    });
    this.updateCalendarEvents(); // Met à jour les événements du calendrier avec les plannings filtrés
  }

  updateCalendarEvents() {
    const events = this.filteredPlannings.map(planning => ({
      title: planning.title,
      start: planning.dateDebut,
      end: planning.dateFin,
      color: this.getRandomColor(),
      className: this.isFavorite(planning.idPlanning) ? 'favorite' : ''
    }));

    this.calendarOptions.events = events;
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  toggleFavorite(planning: Planning) {
    // Vérifier si le planning est déjà un favori
    if (this.isFavorite(planning.idPlanning)) {
      // Si le planning est déjà un favori, le supprimer
      const favori = this.favorites.find(favorite => favorite.idPlanning === planning.idPlanning);
      if (favori) {
        this.planningService.deleteFavorisPlan(favori.idFavoris).subscribe(
          () => {
            // Mettre à jour la liste des favoris après la suppression
            this.loadFavorites();
            console.log("existe");
          },
          error => {
            console.error('Error removing planning from favorites:', error);
          }
        );
      }
    } else {
      // Si le planning n'est pas un favori, ajoutez-le aux favoris
      this.planningService.addFavorisPlan(planning.idPlanning, 2).subscribe(
        () => {
          // Mettre à jour la liste des favoris après l'ajout
          this.loadFavorites();
        },
        error => {
          console.error('Error adding planning to favorites:', error);
        }
      );
    }
  }
  
  
  
  

  isFavorite(planningId: number): boolean {
    return this.favorites.some(favorite => favorite.idPlanning === planningId);
  }

  loadFavorites() {
    // Chargez la liste des favoris à partir du service
    this.planningService.getAllFavorisPlans().subscribe(
      favorites => {
        this.favorites = favorites;
        this.updateCalendarEvents(); // Met à jour les événements du calendrier avec les favoris
      },
      error => {
        console.error('Error loading favorites:', error);
      }
    );
  }

  existeFav(idPlanning: number, idUser: number): void {
    this.planningService.existeFav(idPlanning, idUser)
      .subscribe(favoriExiste => {
        if (favoriExiste) {
          console.log('Le planning existe dans les favoris.');
          // Autres actions à effectuer si le planning existe dans les favoris
        } else {
          console.log('Le planning n\'existe pas dans les favoris.');
          // Autres actions à effectuer si le planning n'existe pas dans les favoris
        }
      }, error => {
        console.error('Une erreur s\'est produite lors de la vérification du favori :', error);
        // Gérer l'erreur de manière appropriée
      });
  }
  
}