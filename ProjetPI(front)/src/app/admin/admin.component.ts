import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../components/shared/services/auth.service';
import { ReclamationService } from '../components/Reclamation/reclamation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{


  chartData: any = {};

  rec: any[] | undefined ;
  users: any[] | undefined;
  selectedRec: any = {};
  @ViewChild('updateModal') updateModal!: ElementRef;
  constructor(private auth:AuthService,public router:Router , private reclamation:ReclamationService){}
  ngOnInit(): void {
    this.reclamation.getReclamation().subscribe(
      (reclamations: any[]) => {
        // Process the reclamations data to extract necessary information for the chart
        const labels = reclamations.map(reclamation => reclamation.subject);
        const data = reclamations.map(reclamation => reclamation.code); // Assuming 'code' is the data you want to visualize
        this.chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Réclamations par sujet',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.5)', // Color for the bars
              borderColor: 'rgba(54, 162, 235, 1)', // Border color for the bars
              borderWidth: 1
            }
          ]
        };
      },
      (error) => {
        console.error('Erreur lors du chargement des réclamations :', error);
      }
    );
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

      },error => {
        console.error('Error deleting reclamation:', error);
        // Handle error case 
      });
      }

}
