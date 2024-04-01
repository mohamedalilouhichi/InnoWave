import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { DateClickArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import { PlanningService } from '../planning.service';
import { Planning } from 'src/app/models/Planning';

@Component({
  selector: 'app-calendar-admin',
  templateUrl: './calendar-admin.component.html',
  styleUrls: ['./calendar-admin.component.css']
})
export class CalendarAdminComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg: DateClickArg) => this.handleDateClick(arg),
    eventClick: (info) => this.handleEventClick(info.event),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridYear'
    },
    events: []
  };

  constructor(private router: Router, private planningService: PlanningService) {}

  handleDateClick(arg: DateClickArg) {
    this.router.navigate(['/planning']);
  }

  handleEventClick(event: any) {
    // Récupérer l'identifiant du planning à partir de l'événement
    const planningId = event.id;
    // Rediriger vers la page de mise à jour du planning avec l'identifiant du planning
    this.router.navigate(['update-calendar', planningId]);
  }

  ngOnInit() {
    this.loadPlannings();
  }

  loadPlannings() {
    this.planningService.getAllPlannings().subscribe(plannings => {
      const events = plannings.map(planning => ({
        id: planning.idPlanning.toString(), // Convertir l'identifiant en chaîne de caractères
        title: planning.title,
        start: planning.dateDebut,
        end: planning.dateFin,
        backgroundColor: this.getRandomColor() // Ajouter la couleur aléatoire
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
