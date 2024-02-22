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
    if (this.isValidForm()) {
      this.planningService.AddPlanning(this.newPlanning).subscribe(
        () => {
          console.log('Planning added successfully');
          this.router.navigate(['/planning/show-planning']); // Redirect to show-planning page
        },
        (error: any) => {
          console.error('Error adding planning:', error);
        }
      );
    }
  }

  isValidForm(): boolean {
    return !!this.newPlanning.planDescription && !!this.newPlanning.durationInMonths && this.newPlanning.durationInMonths > 0;
  }
}
