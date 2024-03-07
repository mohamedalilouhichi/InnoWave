import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { StageService } from './stage.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

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
          Swal.fire({
            title: "Great!",
            text: "Your internship offer is added!",
            icon: "success"
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
            this.getStageById(this.idEntreprise);
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
            this.getStageById(this.idEntreprise);
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
}
