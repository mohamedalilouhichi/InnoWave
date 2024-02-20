import { Component, OnInit } from '@angular/core';
import {StageService} from "../stage.service";

@Component({
  selector: 'app-getstage',
  templateUrl: './getstage.component.html',
  styleUrls: ['./getstage.component.css']
})
export class GetstageComponent implements OnInit {
  stages: any[] = [];

  constructor(private stageService: StageService) { }

  ngOnInit() {
    this.fetchStages();
  }

  fetchStages() {
    this.stageService.getStage().subscribe((data: any[]) => {
      this.stages = data;
    });
  }
}
