import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { StageService } from './stage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
  stages: any[] = [];
  newStage: any = {};
  selectedStage: any = {};
  pageTitle!: string;
  idEntreprise: number = 0; // Initialize idEntreprise to 0

  @ViewChild('updateModal', { static: true }) updateModal!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private stageService: StageService
  ) {}

  ngOnInit() {
    // Retrieve enterprise id from route parameters
    this.route.params.subscribe(params => {
      this.idEntreprise = params['id']; // Assign the value to idEntreprise
      this.pageTitle = 'enterprise ' + this.idEntreprise + ' offers';
      this.getStageById(this.idEntreprise);
    });
  }

  getStageById(idEntreprise: number) {
    this.stageService.getStageById(idEntreprise).subscribe(
      (data: any[]) => {
        this.stages = data;
        console.log('Stages retrieved successfully', this.stages);
      },
      error => {
        console.log('Error retrieving stages', error);
      }
    );
  }

  addStage() {
    if (this.newStage && Object.keys(this.newStage).length !== 0) {
      this.stageService.addStage(this.newStage, this.idEntreprise).subscribe(
        () => {
          console.log('Stage added successfully');
          this.newStage = {};
          this.getStageById(this.idEntreprise);
        },
        error => {
          console.error('Error adding stage:', error);
        }
      );
    } else {
      console.warn('Cannot add a null stage.');
    }
  }


  deleteStage(stage: any) {
    this.stageService.deleteStage(stage).subscribe(
      () => {
        this.getStageById(this.idEntreprise);
      },
      error => {
        console.error('Error deleting stage:', error);
      }
    );
  }

  openUpdateModal(stage: any) {
    this.selectedStage = { ...stage };
    this.updateModal.nativeElement.style.display = 'block';
  }

  closeUpdateModal() {
    this.selectedStage = {};
    this.updateModal.nativeElement.style.display = 'none';
  }

  updateStage() {
    this.stageService.updateStage(this.selectedStage).subscribe(
      () => {
        this.selectedStage = {};
        this.getStageById(this.idEntreprise);
        this.closeUpdateModal();
      },
      error => {
        console.error('Error updating stage:', error);
      }
    );
  }
}
