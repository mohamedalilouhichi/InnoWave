import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { StageService } from './stage.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {Competences} from "../../models/competences";
import {CompetencesService} from "../Competences/competences.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
  stages: any[] = [];
  newStage: any = {};
  competences: Competences = new Competences(); // Initialize Competences object
  addedCompetences: Competences[] = []; // Array to store added competences
  spans: any[] = Array(5).fill(0);
  selectedStage: any = {};
  pageTitle!: string;
  idEntreprise: number = 0; // Initialize idEntreprise to 0

  @ViewChild('updateModal', { static: true }) updateModal!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private stageService: StageService,
  private competencesService: CompetencesService // Inject CompetencesService

) {}

  ngOnInit() {
    // Retrieve enterprise id from route parameters
    this.route.params.subscribe(params => {
      this.idEntreprise = params['id']; // Assign the value to idEntreprise
      this.pageTitle = 'enterprise ' + this.idEntreprise + ' offers';
      this.getStageByIdEtreprise(this.idEntreprise);
    });
  }

  getStageByIdEtreprise(idEntreprise: number) {
    this.stageService.getStageByIdEtreprise(idEntreprise).subscribe(
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
        (addedStage: any) => {
          console.log('Stage added successfully', addedStage);
          const idStage = addedStage.idStage; // Correctly capture the ID of the newly added stage
          console.log('ID of the newly added stage is', idStage); // Log the ID of the newly added stage

          // Add competences to the stage
          this.competencesService.addCompetencesToStage(idStage, this.addedCompetences).subscribe({
            next: (response) => {
              console.log("Competences added successfully to stage", response);
              this.addedCompetences = []; // Clear the array of added competences
              this.getStageByIdEtreprise(this.idEntreprise); // Refresh the list of stages
              Swal.fire({
                title: "Great!",
                text: "Your internship offer is added!",
                icon: "success"
              });
            },
            error: (error) => {
              console.error("There was an error adding the competences to stage", error);
              Swal.fire({
                title: "Oops!",
                text: "An error occurred while adding competences to the stage.",
                icon: "error"
              });
            }
          });
        },
        error => {
          console.error('Error adding stage:', error);
          Swal.fire({
            title: "Oops!",
            text: "An error occurred while adding the stage. Please try again later.",
            icon: "error"
          });
        }
      );
    } else {
      console.warn('Cannot add a null stage.');
      Swal.fire({
        title: "Oops!",
        text: "Cannot add a null stage.",
        icon: "error"
      });
    }
  }

  addComp() {
    this.competencesService.addCompetencesToStage(this.selectedStage.id, [this.competences]).subscribe({
      next: (response) => {
        console.log("Competence(s) added successfully to stage", response);
        // Navigate to the appropriate route after adding the competence(s)
        this.router.navigate(['/competence/get']); // Adjust the route as needed
      },
      error: (error) => {
        console.error("There was an error adding the competence(s) to stage", error);
      }
    });
  }


  deleteStage(stage: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.stageService.deleteStage(stage).subscribe(
          () => {
            swalWithBootstrapButtons.fire({
              title: 'Deleted!',
              text: 'Your Offer has been deleted.',
              icon: 'success'
            });
            this.getStageByIdEtreprise(this.idEntreprise);
          },
          error => {
            console.error('Error deleting stage:', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your Offer is safe',
          icon: 'error'
        });
      }
    });
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
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        this.stageService.updateStage(this.selectedStage).subscribe(
          () => {
            Swal.fire('Saved!', '', 'success');
            this.selectedStage = {};
            this.getStageByIdEtreprise(this.idEntreprise);
            this.closeUpdateModal();
          },
          error => {
            console.error('Error updating stage:', error);
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  addSkill() {
    // Check if both the name and the level are provided
    if (this.competences.name && this.competences.name.trim() !== '' && this.competences.importanceLevel) {
      // Push the competence to the local array
      this.addedCompetences.push({...this.competences});
      // Clear the input fields after adding the competences
      this.competences = new Competences();
    } else {
      console.error('Cannot add a skill with empty name and level.');
      Swal.fire({
        title: "Oops!",
        text: "Please add  a skill name and level.",
        icon: "error"
      });
    }
  }

  deleteSkill(index: number) {
    this.addedCompetences.splice(index, 1);
  }

  deleteComp(idCompetences: number) {
    console.log('ID to delete:', idCompetences);

    const swalForDelete = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalForDelete.fire({
      title: 'Are you sure?',
      text: "You won't be able to go back!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: ' No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.competencesService.deleteCompetence(idCompetences).subscribe(
          () => {
            console.log('Skill successfully removed');

            this.addedCompetences = this.addedCompetences.filter(comp => comp.idCompetences !== idCompetences);
            swalForDelete.fire(
              'Deleted!',
              'The skill has been removed.',
              'success'
            );

          },
          error => {
            console.error('An error occurred while deleting the competence:', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalForDelete.fire(
          'Canceled',
          'Your skill is secure :)',
          'error'
        );
      }
    });
  }


}
