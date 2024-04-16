import { Component, OnInit } from '@angular/core';
import { StageService } from './stage.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
  stages: any[] = [];
  newStage: any = {}; // Define newStage object for adding stages

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
    this.stageService.addStage(this.newStage).subscribe(() => {
      this.newStage = {};
      this.fetchStages();
    });
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






}
