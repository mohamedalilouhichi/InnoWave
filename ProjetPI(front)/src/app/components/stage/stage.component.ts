import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { StageService } from './stage.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
  stages: any[] = [];
  newStage: any = {}; // Define newStage object for adding stages
  selectedStage: any = {}; // Define selectedStage object for updating stages

  @ViewChild('updateModal') updateModal!: ElementRef; // Add non-null assertion operator

  constructor(private stageService: StageService) { }

  ngOnInit() {
    this.fetchStages();
  }

  fetchStages() {
    this.stageService.getStage().subscribe((data: any[]) => {
      console.log(data);
      this.stages = data;
    });
  }

  addStage() {
    // Check if all required fields are filled
    if (
      this.newStage.title &&
      this.newStage.description &&
      this.newStage.domain &&
      this.newStage.duration &&
      this.newStage.startDate &&
      this.newStage.endDate &&
      this.newStage.numberOfPositions
    ) {
      // If all required fields are filled, proceed with adding the stage
      this.stageService.addStage(this.newStage).subscribe(() => {
        this.newStage = {};
        this.fetchStages(); // Fetch updated list of stages
      });
    } else {
      // If any required field is missing, log an error or display a message to the user
      console.error('All required fields must be filled.');
      // You can also show a message to the user using alert, Toastr, or any other UI component
    }
  }


  deleteStage(stage: any) {
    this.stageService.deleteStage(stage).subscribe(() => {
      // Success handling
      this.fetchStages();
    }, error => {
      // Error handling
      console.error('Error deleting stage:', error);
    });
  }

  openUpdateModal(stage: any) {
    // Assign the stage object to selectedStage
    this.selectedStage = { ...stage }; // Create a copy of the selected stage
    // Show the update modal
    this.updateModal.nativeElement.style.display = 'block';
  }

  closeUpdateModal() {
    // Clear the selectedStage object
    this.selectedStage = {};
    // Hide the update modal
    this.updateModal.nativeElement.style.display = 'none';
  }

  updateStage() {
    this.stageService.updateStage(this.selectedStage).subscribe(() => {
      this.selectedStage = {};
      this.fetchStages();
      // Close the update modal after successful update
      this.closeUpdateModal();
    }, error => {
      console.error('Error updating stage:', error);
    });
  }
}
