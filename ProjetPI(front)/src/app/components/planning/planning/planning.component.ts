import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlanningService } from '../planning.service';
import { Planning } from 'src/app/models/Planning';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent {
  newPlanning: Planning = new Planning();

  constructor(private planningService: PlanningService, private router: Router) { }

  addPlanning(): void {
   {
      this.planningService.addPlanning(this.newPlanning).subscribe(
        () => {
          console.log('Planning added successfully');
          this.router.navigate(['calendar']); // Redirige vers la page show-planning
        },
        
      );
    }
  }

 
}
