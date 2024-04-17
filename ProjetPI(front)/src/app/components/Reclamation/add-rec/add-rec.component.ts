import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReclamationService } from '../reclamation.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-rec',
  templateUrl: './add-rec.component.html',
  styleUrls: ['./add-rec.component.css']
})
export class AddRecComponent implements OnInit{
  id!: number;
  reclamation: any = {};
  rec: any[] = [];
  newRec: any = {}; // Define newrec object for adding rec
  selectedRec: any = {}; // Define selectedrec object for updating rec

  @ViewChild('updateModal') updateModal!: ElementRef;

  constructor(private recService: ReclamationService) { }

  ngOnInit() {
    this.fetchReclamation();
  }

  fetchReclamation() {
    this.recService.getReclamation().subscribe((data: any[]) => {
      console.log(data);
      this.rec = data;
    });
  }

  addReclamation() {
    console.log(this.newRec);
    this.recService.addReclamation(this.newRec).subscribe(() => {
      this.newRec = {};
      this.fetchReclamation();
    });
  }

  deleteReclamation(id: number): void {
    this.recService.removeReclamations(id)
      .subscribe(result => {
        this.fetchReclamation();

      },error => {
        console.error('Error deleting reclamation:', error);
        // Handle error case 
      });
  }

  openUpdateModal(reclamation: any) {
    // Assign the stage object to selectedStage
    this.selectedRec = { ...reclamation }; // Create a copy of the selected stage
    // Show the update modal
    this.updateModal.nativeElement.style.display = 'block';
  }

  closeUpdateModal() {
    // Clear the selectedStage object
    this.selectedRec = {};
    // Hide the update modal
    this.updateModal.nativeElement.style.display = 'none';
  }

  updateReclamation() {
    this.recService.updateReclamation(this.selectedRec).subscribe(() => {
      this.selectedRec = {};
      this.fetchReclamation();
      this.closeUpdateModal();
    }, error => {
      console.error('Error updating reclamation:', error);
    });
  }
}
