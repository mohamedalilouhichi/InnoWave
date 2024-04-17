import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReclamationService } from 'src/app/components/Reclamation/reclamation.service';
import { AuthService } from 'src/app/components/shared/services/auth.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit{



  rec: any[] | undefined;
  users: any[] | undefined;
  selectedRec: any = {};
  @ViewChild('updateModal') updateModal!: ElementRef;
  constructor(private auth: AuthService,public router :Router, private reclamation: ReclamationService) { }
  ngOnInit(): void {
    this.fetchUser();
  }
  logout() {
    this.auth.logout();
  }
  accueil(){
    this.router.navigate(['/admin'])
  }
  getUser() {
    this.router.navigate(['/admin/utilisateur'])
  } 
  fetchUser() {
    this.auth.getUser().subscribe((data: any[]) => {
      console.log(data);
      this.users = data;
    });
  }
  deleteUser(id: number) {
    this.auth.removeUser(id)
      .subscribe(result => {
        this.fetchUser();

      }, error => {
        console.error('Error deleting User:', error);
      });
  }
  openUpdateModal(user: any) {
    // Assign the stage object to selectedStage
    this.selectedRec = { ...user }; // Create a copy of the selected stage
    // Show the update modal
    this.updateModal.nativeElement.style.display = 'block';
  }

  closeUpdateModal() {
    // Clear the selectedStage object
    this.selectedRec = {};
    // Hide the update modal
    this.updateModal.nativeElement.style.display = 'none';
  }
  updateUser() {
    this.auth.updateUser(this.selectedRec).subscribe(() => {
      this.selectedRec = {};
      this.fetchUser();
      this.closeUpdateModal();
    }, error => {
      console.error('Error updating reclamation:', error);
    });
  }

  getReclamation() {
    this.router.navigate(['/admin/reclamation']);
  }

  fetchReclamation() {
    this.reclamation.getReclamation().subscribe((data: any[]) => {
      console.log(data);
      this.rec = data;
    });
  }
  deleteReclamation(id: number) {
    this.reclamation.removeReclamations(id)
      .subscribe(result => {
        this.fetchReclamation();

      }, error => {
        console.error('Error deleting reclamation:', error);
        // Handle error case 
      });
  }

}

