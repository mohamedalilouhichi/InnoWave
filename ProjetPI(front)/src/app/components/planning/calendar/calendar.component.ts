import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { PlanningService } from '../planning.service'; 
import { Planning } from 'src/app/models/Planning'; 

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
  selectedLevel: string = '';

  // Liste des niveaux dans l'ordre souhaité
  niveauxList: string[] = ["First_year", "Second_year", "Third_year", "Fourth_year"];

  constructor(private planningService: PlanningService) {}

  ngOnInit() {
    this.loadPlannings();
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
      color: this.getRandomColor()
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
}
