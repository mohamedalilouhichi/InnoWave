import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Planning } from 'src/app/models/Planning';
import { PlanningService } from '../../planning.service'; 
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  planning!: Planning;

  constructor(private route: ActivatedRoute, private router: Router, private planningService: PlanningService) { }

  ngOnInit(): void {
    this.getPlanningDetails();
  }

  getPlanningDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) { // Vérification de nullité
      const idNumber = +id; // Convertir en nombre si nécessaire
      this.planningService.getPlanningById(idNumber)
        .subscribe(planning => this.planning = planning);
    }
  }

  goBackToCalendar(): void {
    // Rediriger vers la vue de calendrier
    this.router.navigate(['/calendar']);
  }
}
