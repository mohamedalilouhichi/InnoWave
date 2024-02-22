import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanningService } from '../planning.service';
import { Planning } from 'src/app/models/Planning';

@Component({
  selector: 'app-update-planning',
  templateUrl: './update-planning.component.html',
  styleUrls: ['./update-planning.component.css']
})
export class UpdatePlanningComponent implements OnInit {
  updatedPlanning: Planning = new Planning();
  submitted: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private planningService: PlanningService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getPlanningById(id);
  }

  getPlanningById(id: number): void {
    this.planningService.getPlanningById(id).subscribe(
      (data: Planning) => {
        console.log(data);
        this.updatedPlanning = { ...data }; // Copie des données pour éviter les effets de bord
      },
      (error: any) => {
        console.error('Error fetching planning:', error);
      }
    );
  }

  updatePlanning(): void {
    this.submitted = true;
    if (this.isValidPlanning()) {
      this.planningService.updatePlanning(this.updatedPlanning).subscribe(
        () => {
          console.log('Planning updated successfully');
          this.router.navigate(['/planning-list']);
        },
        (error: any) => {
          console.error('Error updating planning:', error);
        }
      );
    }
  }

  isValidPlanning(): boolean {
    return !!this.updatedPlanning.planDescription && !!this.updatedPlanning.durationInMonths && this.updatedPlanning.durationInMonths > 0;
  }

  cancelUpdate(): void {
    this.router.navigate(['/planning-list']);
  }
}
