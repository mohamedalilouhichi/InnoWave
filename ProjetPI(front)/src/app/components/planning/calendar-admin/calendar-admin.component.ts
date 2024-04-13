import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import { PlanningService } from '../planning.service';
import { Planning } from 'src/app/models/Planning';
import { EventDropArg } from '@fullcalendar/core'; 


@Component({
  selector: 'app-calendar-admin',
  templateUrl: './calendar-admin.component.html',
  styleUrls: ['./calendar-admin.component.css']
})
export class CalendarAdminComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    eventClick: (info) => this.handleEventClick(info.event),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridYear'
    },
    events: [],
    editable: true, // Permet le glisser-déposer des événements
    eventDrop: this.handleEventDrop.bind(this)
  };

  constructor(private router: Router, private planningService: PlanningService) {}

  handleEventClick(event: any) {
    // Récupérer l'identifiant du planning à partir de l'événement
    const planningId = event.id;
    // Rediriger vers la page de mise à jour du planning avec l'identifiant du planning
    this.router.navigate(['update-calendar', planningId]);
  }

  handleEventDrop(eventDropInfo: any) {
    const planningId: number = parseInt(eventDropInfo.event.id); // Convertir l'identifiant en nombre

    // Vérifier si les dates sont définies avant de les utiliser
    if (eventDropInfo.event.start && eventDropInfo.event.end) {
        const newStartDate: Date = new Date(eventDropInfo.event.start);
        const newEndDate: Date = new Date(eventDropInfo.event.end);

        // Mettre à jour les dates de début et de fin de l'événement dans la base de données
        this.planningService.updatePlanningDates(planningId, newStartDate, newEndDate).subscribe(
            () => {
                console.log('Planning dates updated successfully');
            },
            error => {
                console.error('Error updating planning dates:', error);
            }
        );
    } else {
        console.error('Event start or end date is null');
    }
}

  



  ngOnInit() {
    this.loadPlannings();
  }

  loadPlannings() {
    this.planningService.getAllPlannings().subscribe(plannings => {
      const events = plannings.map(planning => ({
        id: planning.idPlanning.toString(),
        title: planning.title,
        start: planning.dateDebut,
        end: planning.dateFin,
        backgroundColor: this.getRandomColor()
      }));
      this.calendarOptions.events = events;
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
}
