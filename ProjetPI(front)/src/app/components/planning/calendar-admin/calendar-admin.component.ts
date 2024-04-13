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
    dateClick: this.handleDateClick.bind(this), // Gérer l'événement dateClick
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

  handleEventClick(info: any) {
    // Récupérer l'identifiant du planning à partir de l'événement
    const planningId = info.id;
    // Rediriger vers la page de mise à jour du planning avec l'identifiant du planning
    this.router.navigate(['update-calendar', planningId]);
  }
  

  handleDateClick(arg: any) {
    // Rediriger vers le formulaire de planification lorsque vous cliquez sur une date
    this.router.navigate(['planning']);
  }

  handleEventDrop(eventDropInfo: any) {
    const planningId: number = parseInt(eventDropInfo.event.id); // Convertir l'identifiant en nombre
    
    // Vérifier si les dates sont définies avant de les utiliser
    if (eventDropInfo.event.start || eventDropInfo.event.end) {
      const newStartDate: Date = new Date(eventDropInfo.event.start);
      const newEndDate: Date = new Date(eventDropInfo.event.end);
 
      // Mettre à jour les dates de début et de fin de l'événement dans la base de données
      this.planningService.updatePlanningDates(planningId, newStartDate, newEndDate).subscribe(
        () => {
          console.log('Planning dates updated successfully');
          // Rafraîchir les plannings après la mise à jour
          this.loadPlannings();
        },
        error => {
          console.error('Error updating planning dates:', error);
        }
      );
  
      // Appeler saveChanges() pour enregistrer les changements
      this.saveChanges(planningId, newStartDate, newEndDate);
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
  saveChanges(id:any,d:any,dd:any) {
    this.planningService.updatePlanningDates(id,d,dd).subscribe();
  }
}
