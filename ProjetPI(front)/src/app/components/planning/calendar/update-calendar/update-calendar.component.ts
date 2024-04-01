// update-calendar.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanningService } from '../../planning.service'; 
import { Planning } from 'src/app/models/Planning'; 

@Component({
  selector: 'app-update-calendar',
  templateUrl: './update-calendar.component.html',
  styleUrls: ['./update-calendar.component.css']
})
export class UpdateCalendarComponent implements OnInit {
  planningId!: number;
  planning!: Planning;

  constructor(private route: ActivatedRoute, private router: Router, private planningService: PlanningService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.planningId = +params['id']; // Récupérer l'identifiant de planning depuis les paramètres d'URL
      this.loadPlanning();
    });
  }

  loadPlanning() {
    this.planningService.getPlanningById(this.planningId).subscribe(
      (planning: Planning) => {
        this.planning = planning;
      },
      (error: any) => {
        console.error('Error fetching planning:', error);
      }
    );
  }

  updatePlanning(): void {
    this.planningService.updatePlanning(this.planning).subscribe(
      () => {
        console.log('Planning updated successfully');
        this.router.navigate(['/calendar-Admin']);
      },
      (error: any) => {
        console.error('Error updating planning:', error);
      }
    );
  }
  deletePlanning(): void {
    this.planningService.deletePlanning(this.planningId).subscribe(
      () => {
        console.log('Planning deleted successfully');
        this.router.navigate(['/calendar-Admin']);
      },
      (error: any) => {
        console.error('Error deleting planning:', error);
      }
    );
  }
}
