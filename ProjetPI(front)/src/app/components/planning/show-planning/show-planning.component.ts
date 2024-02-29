import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanningService } from '../planning.service';
import { Planning } from 'src/app/models/Planning';


@Component({
  selector: 'app-show-planning',
  templateUrl: './show-planning.component.html',
  styleUrls: ['./show-planning.component.css']
})
export class ShowPlanningComponent implements OnInit {
  plannings: Planning[] = [];

  constructor(private router: Router, private planningService: PlanningService) { }

  ngOnInit(): void {
    this.fetchPlannings();
  }

  fetchPlannings(): void {
    this.planningService.getAllPlannings().subscribe(
      (data) => {
        console.log(data);
        this.plannings = data;
        console.log(this.plannings)      },
      (error: any) => {
        console.error('Error fetching plannings:', error);
      }
    );
  }

  deletePlanning(id: number): void {
    if (confirm('Are you sure you want to delete this planning?')) {
      this.planningService.deletePlanning(id).subscribe(
        () => {
          console.log('Planning deleted successfully');
          // Remove the planning from the local list
          this.plannings = this.plannings.filter(planning => planning.idPlanning !== id);
        },
        (error: any) => {
          console.error('Error deleting planning:', error);
        }
      );
    }
  }

  updatePlanning(id: number): void {
    this.router.navigate(['/updatePlan', id]); // Redirect to the update page with the planning ID
  }

  addPlanningRedirect(): void {
    this.router.navigate(['/planning']); // Redirect to the add page
  }
}
