import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../components/shared/services/auth.service';
import { ReclamationService } from '../components/Reclamation/reclamation.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {



  rec: any[] | undefined ;
  users: any[] | undefined;
  selectedRec: any = {};
  @ViewChild('updateModal') updateModal!: ElementRef;
  constructor(private auth:AuthService , private reclamation:ReclamationService){}
logout() {
  this.auth.logout();
}
getUser() {
  this.auth.getUser().subscribe(
    (data: any[]) => {
      this.users = data;
    },
    (error) => {
      console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
      // Afficher un message d'erreur à l'utilisateur ou effectuer d'autres actions nécessaires en cas d'erreur
    }
  );
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

      },error => {
        console.error('Error deleting reclamation:', error);
        // Handle error case 
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
  this.reclamation.getReclamation().subscribe(
    (data: any[]) => {
      this.rec = data;
    },
    (error) => {
      console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
      // Afficher un message d'erreur à l'utilisateur ou effectuer d'autres actions nécessaires en cas d'erreur
    }
  );
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

      },error => {
        console.error('Error deleting reclamation:', error);
        // Handle error case 
      });
      }

}
