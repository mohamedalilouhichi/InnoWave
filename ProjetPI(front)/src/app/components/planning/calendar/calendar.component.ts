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

  plannings: Planning[] = []; // Propriété pour stocker les plannings à afficher dans la liste

  constructor(private planningService: PlanningService) {}

  ngOnInit() {
    this.planningService.getAllPlannings().subscribe(plannings => {
      this.plannings = plannings; // Stocker les plannings récupérés dans la propriété 'plannings'

      const events = plannings.map(planning => ({
        title: planning.title,
        niveau:planning.niveau,
        start: planning.dateDebut,
        end: planning.dateFin,
        description:planning.description,
        color: this.getRandomColor()
      }));

      this.calendarOptions.events = events as any[];
    });
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
    planning.favorite = !planning.favorite;
    // Mettre à jour le planning dans la base de données
    this.planningService.updatePlanning(planning).subscribe(() => {
      console.log('Planning updated successfully');
    }, error => {
      console.error('Error updating planning:', error);
    });
  }
}
